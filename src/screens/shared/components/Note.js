import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  margin: 2rem;
  padding: 3em;
  background-color: #ffcc66;
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
