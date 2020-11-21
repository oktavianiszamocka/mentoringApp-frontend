import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MaterialAvatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Title from '../shared/components/Title';
import Header from '../shared/components/Header';
import NoteForm from '../Student/NoteForm';
import Note from '../shared/components/Note';
import Api from '../../api/index';
import ConfirmDialog from '../shared/components/ConfirmDialog';
import imageUrl from '../../assets/images/taylor.jpg';
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
    idNote: null,
    open: false,
  });

  const [notes, setNotes] = useState([]);
  const [newNoteVisible, setNewNoteVisible] = useState(false);
  const [user, setUser] = useState();
  const [userProfile, setProfile] = useState();

  const onNoteCloseHandler = (idNote) => {
    setDeleteNoteDialogOptions({
      ...deleteNoteDialogOptions,
      open: true,
      idNote,
    });
  };

  const onNoteDeleteDialogClosed = (confirmed, idNote) => {
    if (confirmed) {
      // TODO call to API
      setNotes(notes.filter((n) => n.idNote !== idNote));
    }
    setDeleteNoteDialogOptions({
      ...deleteNoteDialogOptions,
      open: false,
    });
  };

  
  const loadData = async () => {
    const res = await Promise.all([Api.getNotes(), Api.getUserAvaAndName(), Api.getUserProfile()]);
    setNotes(res[0].data.data);
    setUser(res[1].data.data);
    setProfile(res[2].data.data);
    
  };

  useEffect(async () => {
    loadData();
    
  }, []);

  const handleNoteSubmit = (e) => {
    const newNotes = [
      {
        description: e.note,
        idNote: 20,
      },
      ...notes,
    ];

    setNotes(newNotes);
    setNewNoteVisible(false);
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <Grid container>
        <ConfirmDialog {...deleteNoteDialogOptions} onDialogClosed={onNoteDeleteDialogClosed} />
        <Header />
        <Grid item xs={3}>
          <StyledBox>
            <Title text="Notes" />
            {newNoteVisible && <NoteForm onSubmit={handleNoteSubmit} />}
            {notes
                  && notes.map((item) => (
                    <Note
                      idNote={item.idNote}
                      desc={item.description}
                      onCloseHandler={() => onNoteCloseHandler(item.idNote)}
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
          </StyledBox>
        </Grid>
        <Grid item xs={7}>
        {(user && userProfile)
        &&

          <MyProfile user={user} profileInfo={userProfile}/>

        }
          
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfileDashboard;
