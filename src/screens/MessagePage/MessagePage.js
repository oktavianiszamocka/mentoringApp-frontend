import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AvatarImage from '../../assets/images/avatar.jpg';
import UserAvailability from './UserAvailability';
import SearchBar from '../shared/components/SearchBar';
import Header from '../shared/components/Header';
import MessageList from './MessagesList';
import MessageFull from './MessageFull';
// import MessageForm from '../shared/components/MessageForm'
import Api from '../../api/index';
import SenderMessage from './SenderMessage';
import RecieverMessage from './RecieverMessage';
import MessageItem from './MessageItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  message: {
    width: '93%',
    marginLeft: '10px',
    padding: '10px',
  },
  leftgrid: {
    '@media (max-width: 460px)': {
      display: 'none',
    },
  },
  rightgrid: {
    '@media (max-width: 460px)': {
      minWidth: '100%',
    },
  },
  icon: {
    color: 'grey',
  },
  search: {
    width: '92%',
    margin: '10px',
    backgroundColor: '#e6e7eb',
    borderRadius: '2px',
  },
  noBorder: {
    border: 'none',
  },
}));

export default function MessagePage() {
  const [writtenMessage, setWrittenMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reciever, setReciever] = useState();
  const [sender, setSender] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [senderName, setSenderName] = useState();
  const [senderSurname, setSenderSurname] = useState();
  const [senderImg, setSenderImg] = useState();
  const [hasMessages, setHasMessages] = useState();
  const [searchString, setSearchString] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const classes = useStyles();
  const icon = <SearchIcon className={classes.icon} />;

  const user = {
    firstName: senderName,
    lastName: senderSurname,
    imageUrl: senderImg,
  };

  const loadMessData = async (id) => {
    setErrorMsg(null);
    await Api.getDetailMessages(9, id)
      .then((response) => {
        setMessages(response.data.data.messages.sort((a, b) => ((a.createdOn > b.createdOn) ? 1 : -1)));
        setSender(response.data.data.senderUser);
        setReciever(response.data.data.receiverUser);
      }).catch((err) => {
        // setErrorMsg(err.response.data);
      });
  };

  const loadInitialData = async () => {
    setErrorMsg(null);
    await Api.getAllMessages()
      .then((response) => {
        if (response.data.data.length === 0) {
          setHasMessages(false);
        } else {
          setSenderName(response.data.data[0].senderUser.firstName);
          setSenderSurname(response.data.data[0].senderUser.lastName);
          setSenderImg(response.data.data[0].senderUser.imageUrl);
          setHasMessages(true);
          loadMessData(response.data.data[0].senderUser.idUser);
        }
      }).catch((err) => {
        // setErrorMsg(err.response.data);
      });
  };

  const sendMessage = async () => {
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const messageData = {
      receiver: 9,
      sender: sender.idUser,
      message1: writtenMessage,
      createdOn: moment().toJSON(),
    };
    const messageResult = await Promise.all([Api.sendMessage(messageData)]);
    const response = await Promise.all([Api.getDetailMessages(9, sender.idUser)]);
    setMessages(response[0].data.data.messages.sort((a, b) => ((a.createdOn > b.createdOn) ? 1 : -1)));
    setWrittenMessage('');
  };

  useEffect(async () => {
    loadInitialData();
    // loadData();
  }, []);

  const handleMessage = (e) => {
    setWrittenMessage(e.target.value);
  };

  const handleChildCallback = (messageData, senderData, recieverUser) => {
    setMessages(messageData);
    setSenderName(senderData.firstName);
    setSenderSurname(senderData.lastName);
    setSenderImg(senderData.imageUrl);
    setSender(senderData);
  };

  const handleSearch = async () => {
    const response = await Promise.all([Api.messageSearch(searchString)]);
    if (response) {
      setSearchResults(response[0].data.data);
    }
  };

  const getDetailMessage = (reciever) => {
    setSearchClicked(true);
    console.log(reciever);
    setReciever(reciever);
  };

  console.log(searchClicked);
  return (
    <div className={classes.root} style={{ marginTop: '6rem' }}>
      <Grid container>
        {Header()}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3} container direction="column" spacing={2} className={classes.leftgrid}>
            <Grid item>
              <Paper style={{ height: '25rem', backgroundColor: '#f4f6f8' }}>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    className={classes.search}
                    size="small"
                    onChange={(e) => {
                      setSearchString(e.target.value);
                      handleSearch();
                    }}
                    InputProps={{
                      endAdornment: icon,
                      classes: { notchedOutline: classes.noBorder },
                    }}
                  />
                </Grid>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    {searchResults.length > 0
                      ? (
                        <List component="nav" aria-label="secondary mailbox folders">
                          {searchResults.map((item) => (
                            <ListItem button onClick={() => { getDetailMessage(item); console.log(searchClicked); }}>
                              <MessageItem user={item} />
                            </ListItem>
                          ))}
                        </List>
                      )
                      : hasMessages
                        ? <MessageList parentCallback={handleChildCallback} />
                        : (
                          <div>
                            <Alert severity="info">You have no messages</Alert>
                          </div>
                        )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          { searchClicked ? (
            <Grid item xs={6} sm={9} container direction="column" spacing={1} className={classes.rightgrid}>
              <Grid item>
                <UserAvailability user={reciever} />
              </Grid>
              <Grid item>
                <Paper style={{
                  minHeight: '30vh', maxHeight: '50vh', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', backgroundColor: '#f4f6f8',
                }}
                >
                  <div>
                    {messages.length > 0 && sender && reciever ? (
                      messages.map((item) => (
                        item.sender == 9
                          ? (
                            <div style={{
                              display: 'flex', justifyContent: 'flex-end',
                            }}
                            >
                              {' '}
                              <SenderMessage message={item.message1} senderUser={sender} />
                              {' '}
                            </div>
                          )
                          : <RecieverMessage message={item.message1} recieverUser={reciever} />
                      ))) : (
                        <div />
                    )}
                  </div>
                </Paper>
                <Paper style={{ marginTop: '5px' }}>
                  <TextField
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        ev.preventDefault();
                        setWrittenMessage(ev.target.value);
                        sendMessage();
                      }
                    }}
                    multiline
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    value={writtenMessage}
                    label="Type message here"
                    className={classes.message}
                    onChange={handleMessage}
                  />
                  <SendIcon style={{ color: '#4f5052', marginTop: '2%', marginLeft: '10px' }} onClick={sendMessage} />
                </Paper>
              </Grid>
            </Grid>
          ) : <div />}
          { hasMessages
            ? (
              <Grid item xs={6} sm={9} container direction="column" spacing={1} className={classes.rightgrid}>
                <Grid item>
                  <UserAvailability user={user} />
                </Grid>
                <Grid item>
                  <Paper style={{
                    minHeight: '30vh', maxHeight: '50vh', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', backgroundColor: '#f4f6f8',
                  }}
                  >
                    <div>
                      {messages.length > 0 && sender && reciever ? (
                        messages.map((item) => (
                          item.sender == 9
                            ? (
                              <div style={{
                                display: 'flex', justifyContent: 'flex-end',
                              }}
                              >
                                {' '}
                                <SenderMessage message={item.message1} senderUser={sender} />
                                {' '}
                              </div>
                            )
                            : <RecieverMessage message={item.message1} recieverUser={reciever} />
                        ))) : (
                          <div />
                      )}
                    </div>
                  </Paper>
                  <Paper style={{ marginTop: '5px' }}>
                    <TextField
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          ev.preventDefault();
                          setWrittenMessage(ev.target.value);
                          sendMessage();
                        }
                      }}
                      multiline
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      value={writtenMessage}
                      label="Type message here"
                      className={classes.message}
                      onChange={handleMessage}
                    />
                    <SendIcon style={{ color: '#4f5052', marginTop: '2%', marginLeft: '10px' }} onClick={sendMessage} />
                  </Paper>
                </Grid>
              </Grid>
            )
            : (
              <Grid item xs={6} sm={9}>
                <Alert severity="info">Your inbox is empty</Alert>
              </Grid>
            )}

        </Grid>
      </Grid>
    </div>
  );
}
