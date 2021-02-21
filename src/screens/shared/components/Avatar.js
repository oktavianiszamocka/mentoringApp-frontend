import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MaterialAvatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Font from '../../../globals/font';

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

const Avatar = ({
  idUser, firstName, lastName, imageUrl, width,
}) => (
  <StyledDiv>
    <IconButton href={`/profile/${idUser}`}>

      <MaterialAvatar
        src={imageUrl}
        style={{
          width, height: width, boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)', borderRadius: '1.5rem',
        }}
      />

    </IconButton>
    <StyledSpan>{`${firstName} ${lastName}`}</StyledSpan>
  </StyledDiv>
);

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
