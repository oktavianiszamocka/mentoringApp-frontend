import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Font from '../../../globals/font';

const StyledSection = styled.section`
  margin: 2rem;
`;

const StyledH1 = styled.h1`
  text-align: ${(props) => props.textAlign};
  font-size: ${(props) => props.fontSize};
  font-family: ${Font.fontFamily};
  color: ${(props) => props.fontColor};
`;

const Title = ({ text, textAlign, fontSize, fontColor }) => {
  return (
    <StyledSection>
      <StyledH1 textAlign={textAlign} fontSize={fontSize} fontColor={fontColor}>
        {text}
      </StyledH1>
    </StyledSection>
  );
};

Title.defaultProps = {
  textAlign: 'center',
  fontSize: '1.5em',
  fontColor: 'black',
};

Title.prototype = {
  text: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
};

export default Title;
