import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import NewTaskForm from './NewTaskForm';
import Api from '../../../api/index';
import TaskAdd from './TaskAdd';

const StyledDiv = styled.div`
  margin: 10px;
  background-color: #F5F5F5;
  min-width: 250px;
  max-width: 320px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledTitle = styled.p`
   font-family: 'Roboto', sans-serif;
   font-size: 15px;
   font-weight: bold;
`;

const useStyles = makeStyles({
  plus: {
    marginRight: '3px',
  },
});

function DragandDrop(props) {
  const classes = useStyles();
  const [newNoteVisible, setNewNoteVisible] = useState(false);

  const updateTaskStatus = async (idOfCard, newstatus) => {
    const taskData = {
      IdTask: idOfCard,
      Status: newstatus,
    };

    await Api.updateTaskStatus(taskData);
  };

  const drop = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');

    const card = document.getElementById(card_id);
    card.style.display = 'block';

    e.target.appendChild(card);
    const id_of_parent = document.getElementById(card_id).parentNode.id;
    const status = id_of_parent.slice(-1);

    updateTaskStatus(card_id, status);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <StyledDiv id={props.id} onDrop={drop} onDragOver={dragOver}>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={10}>
          <StyledTitle>{props.title}</StyledTitle>
        </Grid>
        <Grid item xs={2}>
          <AddIcon
            fontSize="small"
            className={classes.plus}
            onClick={() => setNewNoteVisible(true)}
          />
          <MoreHorizIcon fontSize="small" />
        </Grid>
        {newNoteVisible && (
        <TaskAdd close={setNewNoteVisible} />
        )}
      </Grid>

      { props.children }
    </StyledDiv>
  );
}

export default DragandDrop;
