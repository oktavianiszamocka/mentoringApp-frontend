import React, { useEffect, useState } from 'react';
import Avatar from '../../shared/components/Avatar';
import TagsComponent from '../../shared/components/TagsComponent';
import Comment from '../../shared/components/Comment';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import axios from 'axios';
import UpsertPost from './Form';

const StyledDiv = styled.div`
  display: flex;
  margin: 5px;
`;

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
`;

const StyledP = styled.p`
  padding: 2rem;
`;

const StyledC = styled.p`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 1px 1px 0 0;
  margin: 1px;
`;

const imgTheme = {
  width: '50px',
  borderRadius: '50%',
};

const spanTheme = {
  fontSize: '1.5rem',
  marginLeft: '1.7rem',
  marginTop: '1.0rem',
};

const StyledAvatar = styled.img`
  display: 300px;
  border-radius: ${(props) => props.imgTheme.borderRadius};
  width: ${(props) => props.imgTheme.width};
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const inputStyle = {
  color: 'blue',
  marginLeft: '20px',
};

const Post = ({ user, postData }) => {


  const StyledDiv = styled.div`
    display: flex;
  `;

  console.log('postData', postData);
  return (
    <>
      <StyledSection>
        <StyledHeader>
          <Avatar {...user} imgTheme={imgTheme} spanTheme={spanTheme} />
          {postData && <div> {postData.title} </div>}
        
        </StyledHeader>

        {postData && <StyledP> {postData.content} </StyledP>}

        <StyledC>
          {postData && <TagsComponent tags={postData.tags} />}
          <hr />
          <div style={{ display: 'inline', justifyContent: 'center', margin: 1060 }}>
            <Button style={{ fontSize: 10 }} variant="default">
              All comments
            </Button>

            {postData.newestComment && <Comment comment={postData.newestComment}/> }
          </div>
          <hr />

          <StyledDiv>
            <StyledAvatar
              src={user && user.imageUrl}
              imgTheme={imgTheme}
              width="50px"
              border-radius="30%"
            />
            <input
              className="media-body p-2 shadow-sm rounded bg-light border"
              type="text"
              placeholder="Write a comment.."
              style={inputStyle}
              name="comment"
            />
          </StyledDiv>
        </StyledC>
      </StyledSection>
    </>
  );
};
export default Post;
