import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import moment from 'moment';
import Title from '../shared/components/Title';
import Header from '../shared/components/Header';
import NoteForm from '../Student/NoteForm';
import Note from '../shared/components/Note';
import Api from '../../api/index';
import ConfirmDialog from '../shared/components/ConfirmDialog';
import MyProfile from './MyProfile';

const StyledBox = styled(Box)({
  padding: '1.5rem',
  marginTop: '2rem',
  marginRight: '3rem',
  width: '12rem',
  boxShadow: '1px 1px 2px grey',
});

const MyProfileDashboard = () => {
  const [deleteNoteDialogOptions, setDeleteNoteDialogOptions] = useState({
    title: 'Delete note',
    mainText: 'Are you sure you want to delete this note?',
    id: null,
    open: false,
  });
  const defaultInitialValueNote = {
    idNote: '',
    description: '',
  };
  const [notes, setNotes] = useState([]);
  const [newNoteVisible, setNewNoteVisible] = useState(false);
  const [user, setUser] = useState();
  const [userProfile, setProfile] = useState();
  const [pageNote, setPageNote] = useState(1);
  const [countNote, setCountNote] = useState(0);
  const [onUpdateAction, setUpdateAction] = useState(false);
  const [updateNoteInitialValue, setUpdateNoteInitialValue] = useState(defaultInitialValueNote);

  const loadData = async () => {
    const res = await Promise.all([Api.getNotes(pageNote), Api.getUserAvaAndName(), Api.getUserProfile()]);
    setNotes(res[0].data.data);
    setCountNote(res[0].data.totalPages);
    setUser(res[1].data.data);
    setProfile(res[2].data.data);
  };

  useEffect(async () => {
    loadData();
  }, []);

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

  const handlePageNoteChange = async (e, value) => {
    setPageNote(value);
    const getNotes = await Api.getNotes(pageNote)
      .then((response) => response.data);
    setNotes(getNotes.data);
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

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <ConfirmDialog {...deleteNoteDialogOptions} onDialogClosed={onNoteDeleteDialogClosed} />
        <Header />
        <Grid item xs={3}>
          <StyledBox>
            <Title text="Notes" />
            {newNoteVisible && (
            <NoteForm
              onSubmit={onUpdateAction ? handleNoteUpdateSubmit : handleNotePostSubmit}
              initialValue={updateNoteInitialValue.description}
            />
            )}
            {notes
              && notes.map((item) => (
                <Note
                  idNote={item.idNote}
                  desc={item.description}
                  onCloseHandler={() => onNoteCloseHandler(item.idNote)}
                  onUpdateHandler={() => onNoteUpdateHandler(item.idNote, item.description)}
                />
              ))}
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setNewNoteVisible(true)}
              style={{ marginTop: 10, marginLeft: 100 }}
            >
              Add Note
            </Button>
            <Pagination
              color="primary"
              count={countNote}
              page={pageNote}
              siblingCount={1}
              boundaryCount={1}
              onChange={handlePageNoteChange}
            />
          </StyledBox>
        </Grid>
        <Grid item xs={7}>
          {user && userProfile && <MyProfile user={user} profileInfo={userProfile} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfileDashboard;
