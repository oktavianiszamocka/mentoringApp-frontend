import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
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

  const classes = useStyles();

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
        setSenderName(response.data.data[0].senderUser.firstName);
        setSenderSurname(response.data.data[0].senderUser.lastName);
        setSenderImg(response.data.data[0].senderUser.imageUrl);
        loadMessData(response.data.data[0].senderUser.idUser);
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

  const isAvailable = false;

  return (
    <div className={classes.root} style={{ marginTop: '6rem' }}>
      <Grid container>
        {Header()}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3} container direction="column" spacing={2} className={classes.leftgrid}>
            <Grid item>
              <Paper style={{ height: '25rem', backgroundColor: '#f4f6f8' }}>
                <Grid item>
                  <SearchBar />
                </Grid>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <MessageList parentCallback={handleChildCallback} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={9} container direction="column" spacing={1} className={classes.rightgrid}>
            <Grid item>
              <UserAvailability user={user} active={isAvailable} />
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
                      console.log(ev.target.value);
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
        </Grid>
      </Grid>
    </div>
  );
}
