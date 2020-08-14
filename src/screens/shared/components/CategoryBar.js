import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import styled from 'styled-components';

const StyledDiv=styled.div`
  display: flex;
`;


const StyledSpan=styled.span`
  font-family: 'Open Sans Condensed', sans-serif;
  background-color:  #C0C0C0;
  border-radius: 25px;
  border: 2px solid #C0C0C0;
  padding: 10px; 
  margin: 3px;
  width: 120px;
  height: 50px; 
`;


const CategoryBar=({categoryName1, categoryName2, categoryName3, spanTheme})=>{
  return (
    <StyledDiv>
      <StyledSpan spanTheme={spanTheme}>{`${categoryName1} `}</StyledSpan>
      <StyledSpan spanTheme={spanTheme}>{` ${categoryName2}`}</StyledSpan>
      <StyledSpan spanTheme={spanTheme}>{` ${categoryName3}`}</StyledSpan>
    </StyledDiv>
  );
};

export default CategoryBar;