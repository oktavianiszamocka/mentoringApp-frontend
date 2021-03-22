import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import ConfirmDialog from 'screens/shared/components/ConfirmDialog';
import { styled, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import Api from '../../../api/index';
import { Note, defaultInitialValueNote } from './Note';
import Title from './Title';
import NoteForm from './NoteForm/index';

const StyledBox = styled(Box)({
  padding: '1.5rem',
  marginTop: '2rem',
  marginRight: '2rem',
  width: '12rem',
  boxShadow: '1px 1px 2px grey',
});
const useStyles = makeStyles({
  alert: {
    backgroundColor: 'rgba(255,165,0,0.2)',
    color: 'black',
    width: '150px',
    margin: '10px auto',

  },
  buttonAdd: {
    marginTop: 10,
    marginLeft: 100,
  },
});

const AllNotes = () => {
  const classes = useStyles();
  const [deleteNoteDialogOptions, setDeleteNoteDialogOptions] = useState({
    title: 'Delete note',
    mainText: 'Are you sure you want to delete this note?',
    id: null,
    open: false,
  });

  const [notes, setNotes] = useState([]);
  const [newNoteVisible, setNewNoteVisible] = useState(false);
  const [onUpdateAction, setUpdateAction] = useState(false);
  const [updateNoteInitialValue, setUpdateNoteInitialValue] = useState(defaultInitialValueNote);
  const [pageNote, setPageNote] = useState(1);
  const [countNote, setCountNote] = useState(0);

  const loadData = async () => {
    const res = await Promise.all([Api.getNotes(pageNote)]);
    setNotes(res[0].data.data);
    setCountNote(res[0].data.totalPages);
  };

  useEffect(() => {
    loadData();
  });

  const handleNotePostSubmit = async (e) => {
    const noteData = {
      Description: e.note,
      User: Api.getUserId(),
      CreatedOn: moment(),
      LastModified: moment(),
    };
    const newNote = await Api.postNote(noteData)
      .then((response) => response.data);
    const getNotes = await Api.getNotes(pageNote)
      .then((response) => response.data);
    setNotes(getNotes.data);
    setNewNoteVisible(false);
  };

  const handleNoteUpdateSubmit = async (e) => {
    const noteData = {
      idNote: updateNoteInitialValue.idNote,
      Description: e.note,
      User: Api.getUserId(),
      LastModified: moment(),
    };
    const newNote = await Api.updateNote(noteData)
      .then((response) => response.data);
    const newNotes = [
      {
        description: newNote.description,
        idNote: newNote.idNote,
      },
      ...notes,
    ];

    setNotes(newNotes);
    setNewNoteVisible(false);
    setUpdateAction(false);
    setUpdateNoteInitialValue(defaultInitialValueNote);
  };

  const onNoteUpdateHandler = (id, desc) => {
    const noteData = {
      idNote: id,
      description: desc,
    };
    setUpdateAction(true);
    setUpdateNoteInitialValue(noteData);
    setNewNoteVisible(true);
    setNotes(notes.filter((n) => n.idNote !== id));
  };

  const onNoteCloseHandler = (id) => {
    setDeleteNoteDialogOptions({
      ...deleteNoteDialogOptions,
      open: true,
      id,
    });
  };

  const onNoteDeleteDialogClosed = async (confirmed, idNote) => {
    if (confirmed) {
      await Api.deleteNote(idNote);
      const response = await Api.getNotes(pageNote);
      setNotes(response.data.data);
    }

    setDeleteNoteDialogOptions({
      ...deleteNoteDialogOptions,
      open: false,
    });
  };

  const handlePageNoteChange = async (e, value) => {
    setPageNote(value);
    const getNotes = await Api.getNotes(pageNote)
      .then((response) => response.data);
    setNotes(getNotes.data);
  };

  return (
    <div>
      <ConfirmDialog {...deleteNoteDialogOptions} onDialogClosed={onNoteDeleteDialogClosed} />
      <StyledBox>
        <Title text="Notes" />
        {newNoteVisible && (
        <NoteForm
          onSubmit={onUpdateAction ? handleNoteUpdateSubmit : handleNotePostSubmit}
          initialValue={updateNoteInitialValue.description}
        />
        )}

        {notes.length > 0 ? (
          notes.map((item) => (
            <Note
              idNote={item.idNote}
              desc={item.description}
              onCloseHandler={() => onNoteCloseHandler(item.idNote)}
              onUpdateHandler={() => onNoteUpdateHandler(item.idNote, item.description)}
            />

          ))) : (
            <div>
              <Alert
                severity="warning"
                className={classes.alert}
              >
                There are no notes available
              </Alert>
            </div>
        )}

        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => setNewNoteVisible(true)}
          className={classes.buttonAdd}
        >
          Add Note
        </Button>
        {notes.length > 0 ? (
          <Pagination
            color="primary"
            count={countNote}
            page={pageNote}
            siblingCount={1}
            boundaryCount={1}
            onChange={handlePageNoteChange}
          />
        ) : (<div />)}

      </StyledBox>
    </div>

  );
};

export default AllNotes;
