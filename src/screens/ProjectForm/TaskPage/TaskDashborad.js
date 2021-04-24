import React from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import Board from './DragandDrop';
import Card from './Card';
import Header from '../../shared/components/Header';

const StyledMain = styled.main`
  display: flex;
  min-height: 678px;
  margin: 100px auto;
  padding: 15px;
`;

function TaskDashboard() {
  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <StyledMain>
            <Board id="board-1" title="To do">
              <Card id="card-1" content="We need to create a good frontend till the end of month" />
            </Board>

            <Board id="board-2" title="In progress">
              <Card id="card-2" content="Card two" />
            </Board>
            <Board id="board-3" title="Done">
              <Card id="card-3" content="Card three" />
            </Board>
            <Board id="board-4" title="Notes">
              <Card id="card-4" content="Card four" />
            </Board>
          </StyledMain>
        </Grid>

      </Grid>
    </div>
  );
}

export default TaskDashboard;
