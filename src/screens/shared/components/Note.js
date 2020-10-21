import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { styled as mStyled } from '@material-ui/core/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSection = styled.section`
  margin: 0.2rem;
  margin-top: 2rem;
  padding: 0.5rem;
  min-height: 50px;
  background-color: #ffff80;
  box-shadow: 2px 1px 3px grey;
  font-size: 0.8rem;
  position: relative;
`;

const StyledCloseIcon = mStyled(CloseIcon)({
  backgroundColor: '#333',
  borderRadius: '50%',
  color: '#fff',
  position: 'absolute',
  right: '5px',
  top: '5px',
});

const Note = ({ idNote, text, onCloseHandler }) => {
  return (
    <StyledSection>
      <StyledCloseIcon onClick={() => onCloseHandler(idNote)} />
      {text}
    </StyledSection>
  );
};

Note.propTypes = {
  idNote: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};

export default Note;
