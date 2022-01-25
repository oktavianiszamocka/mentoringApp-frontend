import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MessageItem from './MessageItem';
import Api from '../../api/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#f4f6f8',
  },
}));

const MessageList = ({
  parentCallback,
}) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  const loadData = async () => {
    const res = await Promise.all([Api.getAllMessages()]);
    setMessages(res[0].data.data);
  };

  useEffect(() => {
    loadData();
  });

  const onTrigger = async (e, senderUser, recieverUser) => {
    await Api.getDetailMessages(Api.getUserId(), recieverUser.idUser)
      .then((response) => {
        parentCallback(response.data.data.messages.sort((a, b) => ((a.createdOn > b.createdOn) ? 1 : -1)), recieverUser, response.data.data.senderUser);
      }).catch((err) => {
      });

    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {messages.length > 0 ? (
          messages.map((item) => (
            <ListItem
              button
              onClick={(e) => {
                onTrigger(e, item.recieverUser, item.senderUser);
              }}
            >
              <MessageItem
                message={item.message}
                user={item.senderUser}
                lastmessage={item.lastMessage}
              />
            </ListItem>

          ))) : (
            <div />
        )}
      </List>
    </div>
  );
};

export default MessageList;
