import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  display: flex;
`;

const StyledImg = styled.img`
  border-radius: 5px;
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledSpan = styled.span`
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 1rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

const Avatar = ({ firstName, lastName, imageUrl, width }) => {
  return (
    <StyledDiv>
      <StyledImg src={imageUrl} width={width} />
      <StyledSpan>{`${firstName} ${lastName}`}</StyledSpan>
    </StyledDiv>
  );
};

Avatar.defaultProps = {
  imageUrl: '',
  width: '50px',
};

Avatar.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  width: PropTypes.string,
};

export default Avatar;
