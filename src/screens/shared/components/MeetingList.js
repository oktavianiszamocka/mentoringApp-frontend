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
import Api from '../../../api/index';

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
});

const MeetingList = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [author, setAuthor] = useState('');

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

  useEffect(() => {
    loadMeetingData();
    loadAuthorData();
  });

  const currentlySelected = (id) => {
    console.log('clickes');
    console.log(id);
    window.location.href = 'http://localhost:3000/meeting_details';
  };

  return (
    <StyledDiv>
      <Typography variant="h6" className={classes.title}>
        Meeting Notes
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: 750 }}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Note title</TableCell>
              <TableCell align="left">Authors</TableCell>
              <TableCell align="left">Subject</TableCell>
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
                <TableCell align="left">{row.author}</TableCell>
                <TableCell align="left">{row.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledDiv>

  );
};

export default MeetingList;
