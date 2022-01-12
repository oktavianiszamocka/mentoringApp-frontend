import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TableRowColumn } from 'material-ui';
import ClearIcon from '@material-ui/icons/Clear';
import Alert from '@material-ui/lab/Alert';
import Api from '../../../api/index';
import MeetingNoteAdd from './MeetingNoteAdd';

const StyledDiv = styled.div`
  background-color: #F5F5F5;
  position: absolute;
  padding: 10px;
`;

const useStyles = makeStyles({
  table: {
    maxWidth: 750,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    margin: '10px',
    width: '150px',
  },
  button: {
    fontFamily: 'Roboto',
  },
  delete: {
    fontSize: '15px',
  },
});

const MeetingList = (props) => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [author, setAuthor] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadMeetingData = async () => {
    const res = await Promise.all([Api.getMeetingNotes(16)]);
    setNotes(res[0].data.data);
  };

  const loadAuthorData = async (id) => {
    const res2 = await Promise.all([Api.getUserProfile(id)]);
    const name = (res2[0].data.data.firstName);
    const surname = (res2[0].data.data.lastName);
    setAuthor(`${name} ${surname}`);
  };

  const deleteNote = async (e, id) => {
    e.preventDefault();
    const res = await Promise.all([Api.deleteMeetingNote(id)]);
  };

  useEffect(() => {
    loadMeetingData();
    loadAuthorData();
  });

  return (
    <StyledDiv>
      <Grid container direction="row">
        <Grid item lg={9}>
          <Typography variant="h6" className={classes.title}>
            Meeting Notes
          </Typography>
        </Grid>
        <Grid item lg={3}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOpen}>Add note</Button>
        </Grid>
      </Grid>
      {notes.length > 0 ? (
        <div>
          <TableContainer component={Paper} style={{ maxWidth: 750 }}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Note title</TableCell>
                  <TableCell align="left">Authors</TableCell>
                  <TableCell align="left">Subject</TableCell>
                  <TableCell align="left"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((row) => (
                  <TableRow
                    component={Link}
                    to={{ pathname: '/meeting_details', detailProps: { allData: row } }}
                    key={row.id}
                    style={{ textDecoration: 'none', color: 'black' }}
                    hover
                  >
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      {row.authorFirstName}
                      {' '}
                      {row.authorLastName}
                    </TableCell>
                    <TableCell align="left">{row.subject}</TableCell>
                    <TableCell padding="checkbox">
                      <ClearIcon className={classes.delete} onClick={(e) => deleteNote(e, row.idNote)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <MeetingNoteAdd open={open} onClose={handleClose} />
        </div>
      )
        : (
          <div>
            {' '}
            <Alert severity="info">You have no project notes for now</Alert>
          </div>
        )}
    </StyledDiv>

  );
};

export default MeetingList;
