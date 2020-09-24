import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
`;


const StyledSpan = styled.span`
  font-family: 'Open Sans Condensed', sans-serif;
  background-color:  #C0C0C0;
  border-radius: 25px;
  border: 2px solid #C0C0C0;
  padding: 10px; 
  margin: 3px;
  width: 120px;
  height: 50px; 
`;


const TagsComponent = ({ tagName1, tagName2, tagName3, spanTheme }) => {
  return (
    <StyledDiv>
      <StyledSpan spanTheme={spanTheme}>{`${tagName1} `}</StyledSpan>
      <StyledSpan spanTheme={spanTheme}>{` ${tagName2}`}</StyledSpan>
      <StyledSpan spanTheme={spanTheme}>{` ${tagName3}`}</StyledSpan>
    </StyledDiv>
  );
};

export default TagsComponent;