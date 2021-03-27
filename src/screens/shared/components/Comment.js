import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  TextField,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAvatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const StyledTitle = styled.p`
  font-family: 'Roboto', arial;
  font-weight: bold;
  font-size: 13px;
  margin: 2px 4px;
  padding: 0px; 
`;

const StyledDiv = styled.div`
  display: flex;
  margin: 6px 1px;
`;
const StyledCommentDiv = styled.div`
  display: flex;
  margin: 6px 1px;
  background-color: #d9dbde;
  border-radius: 1.5rem;
  padding: 10px;
  flex-direction: column;
`;
const StyledP = styled.p`
  font-family: 'Roboto', arial;
  font-size: 12px;
  margin: 5px;
  color: rgba(1,1,1,0.5);
  margin-top: -2px;

`;

const StyledComment = styled.p`
  font-family: 'Roboto', arial;
  font-size: 14px;
  margin: 5px;
  
`;

const useStyles = makeStyles((theme) => ({
  iconButtonStyle: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  avatar: {
    width: '50px',
    height: '50px',
    boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)',
    borderRadius: '1.5rem',
  },
  divComment: {
    display: 'flex',
    flexDirection: 'row',
  },
  editIcon: {
    marginLeft: '6em', fontSize: 'small',
  },
  deleteIcon: {
    marginLeft: '2px',
    fontSize: 'small',
  },

}));
const Comment = ({
  comment, loggedUser, onDeleteHandler, sendComment,
}) => {
  const momentTime = moment(JSON.stringify(comment.createdOn), 'YYYY-MM-DD hh:mm:ss').fromNow();
  const classes = useStyles();
  const [showEdit, setShowEdit] = useState(false);

  const onEditComment = async (idComment) => {
    setShowEdit(true);
  };

  return (
    <StyledDiv>
      <IconButton className={classes.iconButtonStyle} href={`/profile/${comment.createdBy.idUser}`}>
        <MaterialAvatar
          src={comment.createdBy.imageUrl}
          className={classes.avatar}
        />
      </IconButton>
      <StyledCommentDiv>
        <div className={classes.divComment}>
          <StyledTitle>{`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}</StyledTitle>
          {(comment.createdBy.idUser === loggedUser.idUser) && (
            <div>
              <EditIcon className={classes.editIcon} onClick={() => onEditComment(comment.idComment)} />
              <DeleteIcon className={classes.deleteIcon} onClick={() => onDeleteHandler(comment.idComment)} />
            </div>
          )}
        </div>
        <StyledP>{momentTime}</StyledP>
        {showEdit === true
          ? (
            <TextField
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  console.log(ev.target.value);
                  sendComment(ev.target.value);
                  setShowEdit(false);
                }
              }}
              size="small"
              InputProps={{ classes }}
              multiline
              defaultValue={comment.comment}
              label="Edit your comment"
              className={classes.commentInput}
            />
          )
          : <StyledComment>{comment.comment}</StyledComment>}
      </StyledCommentDiv>
    </StyledDiv>
  );
};

export default Comment;
