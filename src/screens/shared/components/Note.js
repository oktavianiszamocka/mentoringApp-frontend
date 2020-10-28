import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { styled as mStyled } from '@material-ui/core/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";

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

const PaperNote = mStyled(Paper)({
  margin: '0.2rem',
  marginTop : '2rem',
  padding: '0.5rem',
  minHeight: '50px',
  backgroundColor: '#ffff80',
  fontSize: '0.8rem',
  position: 'relative',
  
})

const Note = ({ idNote, desc, onCloseHandler }) => {
  return (
    <PaperNote elevation = {3}>
      <StyledCloseIcon onClick={() => onCloseHandler(idNote)} />
      {desc}
      </PaperNote>
  );
};

Note.propTypes = {
  idNote: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};


export default Note;
