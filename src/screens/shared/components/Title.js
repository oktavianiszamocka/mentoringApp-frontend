import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Font from '../../../globals/font';

const StyledSection = styled.section`
  margin: 2rem;
`;

const StyledH2 = styled.h2`
  font-family: sans-serif !important;
  font-size: 2rem;
  font-weight: 100;
  text-transform: uppercase;
  color: ${(props) => props.fontColor};
`;

const Title = ({ text, textAlign, fontSize, fontColor }) => {
  return (
    <StyledSection>
      <StyledH2 textAlign={textAlign} fontSize={fontSize} fontColor={fontColor}>
        {text}
      </StyledH2>
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
