import React from 'react';
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

const StyledDiv = styled.div`
  background-color: #F5F5F5;
  position: absolute;
  padding: 10px;
`;

const currentlySelected = (id) => {
  console.log('clickes');
  console.log(id);
  window.location.href = 'http://localhost:3000/meeting_details';
};

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

function createData(id, meetingName, authors, subject) {
  return {
    id, meetingName, authors, subject,
  };
}

const rows = [
  createData(1, 'hey', 'Amon', 'aaaaaa'),
  createData(2, 'hellllo', 'Jaba', 'sfasfasf'),
  createData(3, 'bye', 'Amon', 'gdgsd'),

];

export default function DataTable() {
  const classes = useStyles();

  return (
    <StyledDiv>
      <Typography variant="h6" className={classes.title}>
        Meeting 1 Note
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: 750 }}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Meeting Id</TableCell>
              <TableCell align="left">Meeting Name</TableCell>
              <TableCell align="left">Authors</TableCell>
              <TableCell align="left">Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => currentlySelected(row.id)}
                hover
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.meetingName}</TableCell>
                <TableCell align="left">{row.authors}</TableCell>
                <TableCell align="left">{row.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledDiv>

  );
}
