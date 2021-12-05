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
}));

export default function MessagePage() {
  const [writtenMessage, setWrittenMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reciever, setReciever] = useState();
  const [sender, setSender] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const classes = useStyles();

  const user = {
    firstName: 'Jan',
    lastName: 'Kowalsi',
    imageUrl: AvatarImage.toString(),
  };

  const loadData = async () => {
    setErrorMsg(null);
    await Api.getDetailMessages(9, 10)
      .then((response) => {
        console.log(response.data.data.messages);
        setMessages(response.data.data.messages.sort((a, b) => ((a.createdOn > b.createdOn) ? 1 : -1)));
        setSender(response.data.data.senderUser);
        setReciever(response.data.data.receiverUser);
      }).catch((err) => {
        // setErrorMsg(err.response.data);
      });
  };

  const sendMessage = async () => {
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const messageData = {
      receiver: 9,
      sender: 10,
      message1: writtenMessage,
      createdOn: moment().toJSON(),
    };
    const messageResult = await Promise.all([Api.sendMessage(messageData)]);
    const response = await Promise.all([Api.getDetailMessages(9, 10)]);
    setMessages(response[0].data.data.messages.sort((a, b) => ((a.createdOn > b.createdOn) ? 1 : -1)));
  };

  useEffect(async () => {
    loadData();
  }, []);

  const handleMessage = (e) => {
    setWrittenMessage(e.target.value);
  };

  const isAvailable = false;

  return (
    <div className={classes.root} style={{ marginTop: '6rem' }}>
      <Grid container>
        {Header()}
        <Grid container spacing={2}>
          <Grid item xs={3} container direction="column" spacing={2}>
            <Grid item>
              <Paper style={{ height: '25rem', backgroundColor: '#f4f6f8' }}>
                <Grid item>
                  <SearchBar />
                </Grid>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <MessageList />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={8} container direction="column" spacing={1}>
            <Grid item>
              <UserAvailability user={user} active={isAvailable} />
            </Grid>
            <Grid item>
              <Paper style={{
                maxHeight: '50vh', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', backgroundColor: '#f4f6f8',
              }}
              >
                <div>
                  {messages.length > 0 && sender && reciever ? (
                    messages.map((item) => (
                      item.sender == 10
                        ? <SenderMessage message={item.message1} senderUser={sender} />
                        : <RecieverMessage message={item.message1} recieverUser={reciever} />
                    ))) : (
                      <div />
                  )}
                </div>
              </Paper>
              <Paper style={{ marginTop: '5px' }}>
                <TextField
                  multiline
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
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
