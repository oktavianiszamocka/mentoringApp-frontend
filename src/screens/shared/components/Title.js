import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin: 2rem;
`;

const StyleTitle = styled.h1`
  text-align: ${(props) => props.textAlign || "center"};
  font-size: ${(props) => props.fontSize || "1.5em"};
  color: ${(props) => props.fontColor || "black"};
`;

const Title = ({ text, style }) => {
  return (
    <Wrapper>
      <StyleTitle
        textAlign={style.textAlign}
        fontColor={style.fontColor}
        fontSize={style.fontSize}
      >
        {text}
      </StyleTitle>
    </Wrapper>
  );
};

export default Title;
