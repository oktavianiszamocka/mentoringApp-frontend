import React from 'react';
import styled from 'styled-components';


const StyledDiv=styled.div`
  display: flex;
`;


const StyledAvatar=styled.img`
  display: 500px;
  border-radius: ${props => props.imgTheme.borderRadius};
  width: ${props => props.imgTheme.width};
  box-shadow: 1px 1px 2px 0px rgba(135,135,135,1);
  `;

const StyledSpan=styled.span`
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: ${props => props.spanTheme.fontSize};
  margin-left: ${props => props.spanTheme.marginLeft};
  margin-top: ${props => props.spanTheme.marginTop};
`;


const Avatar=({firstName, lastName, imageUrl, imgTheme, spanTheme})=>{
  return (
    <StyledDiv>
      <StyledAvatar src={imageUrl} imgTheme={imgTheme} />
      <StyledSpan spanTheme={spanTheme}>{`${firstName} ${lastName}`}</StyledSpan>
    </StyledDiv>
  );
};

export default Avatar;