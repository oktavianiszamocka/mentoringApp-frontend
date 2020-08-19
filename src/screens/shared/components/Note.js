import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin: 2rem;
  padding: 3em;
  background-color: #ffcc66;
`;

const content = styled.p`
  padding: 2rem;
`;

const Note = ({ text }) => {
  return (
    <Wrapper>
      <content>{text}</content>
    </Wrapper>
  );
};

export default Note;
