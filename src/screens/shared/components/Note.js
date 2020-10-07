import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  margin: 0.5rem;
  padding: 2rem;
  background-color: #ffcc66;
  box-shadow: 4px 1px 5px grey;
`;

const StyledP = styled.p`
  padding: 2rem;
`;

const Note = ({ text }) => {
  return (
    <StyledSection>
      <StyledP>{text}</StyledP>
    </StyledSection>
  );
};

export default Note;
