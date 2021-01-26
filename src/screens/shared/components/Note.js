import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { styled as mStyled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

const StyledCloseIcon = mStyled(CloseIcon)({
  maxWidth: '20px',
  maxHeight: '20px',
  backgroundColor: '#333',
  borderRadius: '50%',
  color: '#fff',
  position: 'absolute',
  right: '5px',
  top: '5px',
});

const StyledEditIcon = mStyled(EditIcon)({
  maxWidth: '20px',
  maxHeight: '20px',
  backgroundColor: '#333',
  borderRadius: '50%',
  color: '#fff',
  position: 'absolute',
  right: '30px',
  top: '5px',

});

const PaperNote = mStyled(Paper)({
  margin: '0.2rem',
  marginTop: '1.5rem',
  padding: '0.5rem',
  minHeight: '50px',
  backgroundColor: '#ffff80',
  fontSize: '0.8rem',
  position: 'relative',
});

const defaultInitialValueNote = {
  idNote: '',
  description: '',
};

const Note = ({
  idNote, desc, onCloseHandler, onUpdateHandler,
}) => (
  <PaperNote elevation={1}>
    <StyledEditIcon onClick={() => onUpdateHandler(idNote, desc)} />
    <StyledCloseIcon onClick={() => onCloseHandler(idNote)} />
    {desc}
  </PaperNote>
);

Note.propTypes = {
  idNote: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  onUpdateHandler: PropTypes.func.isRequired,
};

export {
  Note, defaultInitialValueNote,
};
