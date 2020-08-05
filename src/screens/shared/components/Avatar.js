import React from 'react';
import styled from 'styled-components';

const StyledDiv=styled.div`
  display: flex;
`;

const StyledAvatar=styled.img`
  display: 500px;
  border-radius: 50%;
  width: 50px;
  box-shadow: 1px 1px 2px 0px rgba(135,135,135,1);
  `;

const StyledSpan=styled.span`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
`;

const Avatar=({firstName, lastName, imageUrl})=>{
  return (
    <StyledDiv>
      <StyledAvatar src={imageUrl} />
      <StyledSpan>{`${firstName} ${lastName}`}</StyledSpan>
    </StyledDiv>
  );
};

export default Avatar;