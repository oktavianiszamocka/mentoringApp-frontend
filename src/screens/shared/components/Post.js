import React from 'react';
import Avatar from '../components/Avatar';
import styled from 'styled-components';


const StyledSection=styled.section`
  margin: 2rem;
  background-color: #e0e0e0;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135,135,135,1);
`;

const StyledHeader=styled.header`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 5px 5px 0 0;
`;

const StyledP=styled.p`
  padding: 2rem;
`;

const Post=({text, user})=>{
  
  return (
    <StyledSection>
      <StyledHeader>
        <Avatar firstName={user.firstName} lastName={user.lastName} imageUrl={user.imageUrl} />
      </StyledHeader>
      <StyledP>
        {text}
      </StyledP>
    </StyledSection>
  );
};

export default Post;