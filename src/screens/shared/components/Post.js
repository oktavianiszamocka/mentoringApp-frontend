import React from 'react';
import Avatar from '../components/Avatar';
import CategoryBar from '../components/CategoryBar';
import Comment from '../components/Comment';
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

const StyledC=styled.p`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 1px 1px 0 0;
  margin: 1px;
`;

const imgTheme = {
  width: "70px",
  borderRadius: "50%"
};

const spanTheme = {
  fontSize: "1.5rem",
  marginLeft: "1.7rem",
  marginTop: "1.0rem"
};


const Post=({text, user})=>{

  
const category={
  categoryName1: "Java",
  categoryName2: "Backend",
  categoryName3: "ASP.NET Core"
}; 

  
  return (
    <StyledSection>
      <StyledHeader>
      <Avatar firstName={user.firstName} lastName={user.lastName} imageUrl={user.imageUrl} 
      imgTheme={imgTheme} spanTheme={spanTheme}/>
      </StyledHeader>
      <StyledP>
      {text}
      </StyledP>
      <StyledC>
      <CategoryBar categoryName1={category.categoryName1} categoryName2={category.categoryName2} categoryName3={category.categoryName3}/>
      </StyledC>
      <StyledC> <Comment/> </StyledC>

    </StyledSection>
  );
};
export default Post;
