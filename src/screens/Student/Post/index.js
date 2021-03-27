import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Grid, IconButton, TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MaterialAvatar from '@material-ui/core/Avatar';
import moment from 'moment';
import Comment from '../../shared/components/Comment';
import TagsComponent from '../../shared/components/TagsComponent';
import Api from '../../../api/index';

const StyledSection = styled.section`
  margin: 2rem;
  background-color: #e0e0e0;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;
const StyledHeader = styled.header`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 5px 5px 0 0; 
  display: inline,
  margin: 1000
`;
const StyledP = styled.p`
  font-family: 'Roboto', arial;
  padding: 1rem 2rem;
`;

const StyledTitle = styled.p`
  font-family: 'Roboto', arial;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0px;
  padding: 0px; 
  margin-bottom: 1px;
`;

const StyledData = styled.p`
  font-family: 'Roboto', arial;
  font-size: 0.9rem;
  margin: 0px;
  padding: 1px;
  color: rgba(1,1,1,0.5);
`;

const StyledC = styled.p`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 1px 1px 0 0;
  margin: 1px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1100px',
  },
  iconButtonStyle: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  avatar: {
    width: '50px',
    height: '50px',
    boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)',
    borderRadius: '1.5rem',

  },
  divUser: {
    marginLeft: '10px',
  },
  iconStyle: {
    margin: '8px',

  },
  avatarComment: {
    width: '40px',
    height: '40px',
    boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)',
    borderRadius: '1.5rem',

  },
  commentInput: {
    width: '800px',
    marginLeft: '10px',
  },
  divAllComment: {
    display: 'inline',
    justifyContent: 'center',
  },
  divComment: {
    display: 'inline',
    justifyContent: 'center',
    margin: '1060',
  },
  buttonAllComment: {
    fontSize: 10,
  },
  divPostData: {
    margin: '20px',
  },

}));

const StyledDiv = styled.div`
    display: flex;
    margin: 5px;
    margin-top: 10px;
  `;

const Post = ({
  user, postData, onDeleteHandler, onEditHandler, currentUser,
}) => {
  const classes = useStyles();
  const [showAllComments, setShowAllComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const createdTime = moment(JSON.stringify(postData.dateOfPublication), 'YYYY-MM-DD hh:mm:ss').fromNow();

  const loadComments = async () => {
    const response = await Promise.all([Api.getPostComment(postData.idPost)]);
    setPostComments(response[0].data.data);
  };

  const sendComment = async (comm) => {
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const commentData = {
      post: postData.idPost,
      createdOn: moment().toJSON(),
      createdBy: currentUser.idUser,
      comment1: comm,
    };
    const commentResult = await Promise.all([Api.sendPostComment(commentData)]);
    const response = await Promise.all([Api.getPostComment(postData.idPost)]);
    setPostComments(response[0].data.data);
  };

  const sendEditComment = async (comm) => {
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const commentData = {
      post: postData.idPost,
      createdOn: moment().toJSON(),
      createdBy: currentUser.idUser,
      comment1: comm,
    };
    const commentResult = await Promise.all([Api.editPostComment(commentData)]);
    const response = await Promise.all([Api.getPostComment(postData.idPost)]);
    setPostComments(response[0].data.data);
  };

  const onDeleteComment = async (idComment) => {
    await Api.deletePostComment(idComment);
    const response = await Promise.all([Api.getPostComment(postData.idPost)]);
    setPostComments(response[0].data.data);
  };

  const handleAllComments = () => {
    setShowAllComments(true);
    loadComments();
  };

  return (
    <Grid className={classes.root}>

      <>
        {postData && (
          <StyledSection>
            <StyledHeader>
              <Grid container spacing={0.5}>
                <Grid item xs={0.5}>
                  <IconButton href={`/profile/${user.idUser}`}>
                    <MaterialAvatar
                      src={user.imageUrl}
                      className={classes.avatar}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={10} m={8}>
                  <div className={classes.divUser}>
                    <StyledTitle>{`${user.firstName} ${user.lastName}`}</StyledTitle>
                    <StyledData>{user.description}</StyledData>
                    <StyledData>
                      Posted
                      {' '}
                      {createdTime}
                    </StyledData>
                  </div>
                </Grid>
                <Grid item xs={0.5}>
                  <EditIcon
                    className={classes.iconStyle}
                    onClick={() => onEditHandler(postData.idPost, postData.title, postData.content, postData.tags, user)}
                  />
                </Grid>
                <Grid item xs={0.5}>
                  <DeleteIcon
                    className={classes.iconStyle}
                    onClick={() => onDeleteHandler(postData.idPost)}
                  />
                </Grid>
              </Grid>
            </StyledHeader>
            {postData && (
              <div className={classes.divPostData}>
                <StyledTitle style={{ marginLeft: '2rem' }}>
                  {' '}
                  {postData.title}
                  {' '}
                </StyledTitle>
                <StyledP>
                  {' '}
                  {postData.content}
                  {' '}
                </StyledP>
              </div>

            )}
            <StyledC>
              {postData && <TagsComponent tags={postData.tags} />}
              <hr />
              {!showAllComments && (
                <div className={classes.divAllComment}>

                  {postData.hasMoreThanOneComment && (
                    <Button size="small" variant="default" onClick={() => handleAllComments()} className={classes.buttonAllComment}>
                      All comments
                    </Button>
                  )}

                  { postData.newestComment
                    && <Comment comment={postData.newestComment} loggedUser={currentUser} onDeleteHandler={onDeleteComment} sendComment={sendEditComment} />}

                </div>
              )}
              <div className={classes.divComment}>
                {showAllComments && (postComments.map((comment) => (
                  <Comment comment={comment} loggedUser={currentUser} onDeleteHandler={onDeleteComment} sendComment={sendComment} />
                )))}
              </div>

              <hr />
              <StyledDiv>
                <MaterialAvatar
                  src={user.imageUrl}
                  className={classes.avatarComment}
                />
                <TextField
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      sendComment(ev.target.value);
                      ev.target.value = '';
                    }
                  }}
                  size="small"
                  multiline
                  label="Write a comment..."
                  variant="outlined"
                  className={classes.commentInput}
                />
              </StyledDiv>

            </StyledC>
          </StyledSection>
        )}
      </>
    </Grid>
  );
};

export default Post;
