import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import MessageItem from './MessageItem';
import Api from '../../api/index';

const StyledTitle = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: bold;
    color: black;
`;
const StyledMessage = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    color: #4f5052;
`;

const StyledNumber = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    background-color: #01a389;
    color: white;
    text-align: center;
    border-radius: 4px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#f4f6f8',
  },
}));

const MessageList = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  const loadData = async () => {
    const res = await Promise.all([Api.getAllMessages(9, 10)]);
    setMessages(res[0].data.data);
  };

  useEffect(() => {
    loadData();
  });

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {messages.length > 0 ? (
          messages.map((item) => (
            <ListItem button>
              <MessageItem
                message={item.message}
                user={item.senderUser}
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