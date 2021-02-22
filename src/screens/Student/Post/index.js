import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Grid, IconButton, Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import EditIcon from '@material-ui/icons/Edit';
import MaterialAvatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Comment from '../../shared/components/Comment';
import TagsComponent from '../../shared/components/TagsComponent';
import Avatar from '../../shared/components/Avatar';
import AllComments from './AllComments';

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
  padding: 2rem;
  margin: 5px;
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
  iconButtonStyle: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
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
  const [showAllComments, setShowAllComments] = useState(false);
  const classes = useStyles();

  return (
    <Grid style={{ maxWidth: '1100px' }}>

      <>
        {postData && (
          <StyledSection>
            <StyledHeader>
              <Grid container spacing={0.5}>
                <Grid item xs={0.5}>
                  <MaterialAvatar
                    src={user.imageUrl}
                    style={{
                      width: '50px', height: '50px', boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)', borderRadius: '1.5rem',
                    }}
                  />
                </Grid>
                <Grid item xs={10} m={8}>
                  <div style={{ marginLeft: '10px' }}>
                    <StyledTitle>{`${user.firstName} ${user.lastName}`}</StyledTitle>
                    <StyledData>Computer Science, semester 4</StyledData>
                    <StyledData>Posted 1w ago</StyledData>
                  </div>
                </Grid>
                <Grid item xs={0.5}>
                  <EditIcon
                    style={{ margin: '8px' }}
                    onClick={() => onEditHandler(postData.idPost, postData.title, postData.content, postData.tags, user)}
                  />
                </Grid>
                <Grid item xs={0.5}>
                  <DeleteIcon
                    style={{ margin: '8px' }}
                    onClick={() => onDeleteHandler(postData.idPost)}
                  />
                </Grid>
              </Grid>
            </StyledHeader>
            {postData && (
              <div style={{ margin: '20px' }}>
                <StyledTitle>
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
                <div style={{ display: 'inline', justifyContent: 'center' }}>

                  {postData.hasMoreThanOneComment && (
                    <Button style={{ fontSize: 10 }} variant="default" onClick={() => setShowAllComments(true)}>
                      All comments
                    </Button>
                  )}

                  { postData.newestComment
                    && <Comment comment={postData.newestComment} />}

                </div>
              )}
              <div style={{ display: 'inline', justifyContent: 'center', margin: 1060 }}>
                {showAllComments && <AllComments idPost={postData.idPost} />}
              </div>
              <hr />
              <StyledDiv>
                <MaterialAvatar
                  src={user.imageUrl}
                  style={{
                    width: '40px', height: '40px', boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)', borderRadius: '1.5rem',
                  }}
                />
                <TextField
                  size="small"
                  label="Write a comment..."
                  variant="outlined"
                  multiline
                  style={{
                    width: '800px',
                    marginLeft: '10px',
                  }}
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
