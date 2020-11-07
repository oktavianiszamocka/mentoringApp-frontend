import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Font from '../../../globals/font';
import MaterialAvatar from '@material-ui/core/Avatar';


const StyledDiv = styled.div`
  display: flex;
  margin: 5px;
`;

const StyledSpan = styled.span`
  font-family: ${Font.fontFamily};
  font-size: 1rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

const Avatar = ({ firstName, lastName, imageUrl, width }) => {
  return (
    <StyledDiv>
      <MaterialAvatar src={imageUrl} style={{width: width, height: width, boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)', borderRadius: '1.5rem' }}></MaterialAvatar>
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
