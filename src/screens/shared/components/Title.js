import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSection = styled.section`
  margin: 0rem;
`;

const StyledH2 = styled.h2`
  font-family: sans-serif !important;
  font-size: 1.2rem;
  font-weight: 100;
  letter-spacing: 0.8rem;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  text-transform: uppercase;
  text-align: center;
  color: ${(props) => props.fontColor};
`;

const Title = ({
  text, textAlign, fontSize, fontColor,
}) => (
  <StyledSection>
    <StyledH2 textAlign={textAlign} fontSize={fontSize} fontColor={fontColor}>
      {text}
    </StyledH2>
  </StyledSection>
);

Title.defaultProps = {
  textAlign: 'center',
  fontSize: '1.0rem',
  fontColor: 'black',
};

Title.prototype = {
  text: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
};

export default Title;
