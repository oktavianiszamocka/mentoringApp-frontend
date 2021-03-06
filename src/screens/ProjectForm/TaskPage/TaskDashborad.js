import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import Board from './DragandDrop';
import Card from './Card';
import Header from '../../shared/components/Header';
import Api from '../../../api/index';

const StyledMain = styled.main`
  display: flex;
  min-height: 678px;
  margin: 100px auto;
  padding: 15px;
`;

const TaskDashboard = () => {
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInpr, setTasksInPr] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await Promise.all([Api.getProjectTasks(5)]);

      for (const tasks in res[0].data.data) {
        if (res[0].data.data[tasks].status == 1) {
          setTasksToDo(res[0].data.data[tasks].tasks);
        }
        if (res[0].data.data[tasks].status == 2) {
          setTasksInPr(res[0].data.data[tasks].tasks);
        }
        if (res[0].data.data[tasks].status == 3) {
          setTasksDone(res[0].data.data[tasks].tasks);
        }
      }
    };

    loadData();
  }, []);

  const deleteTask = async (idOfCard) => {
    await Api.deleteTask(idOfCard);

    const res = await Promise.all([Api.getProjectTasks(5)]);
    if (res[0].data.data.length === 1) {
      if (res[0].data.data[0].status !== 1) {
        setTasksToDo([]);
      }
    }
    if (res[0].data.data.length > 1) {
      if (res[0].data.data[1].status !== 2) {
        setTasksInPr([]);
      }
    }
    if (res[0].data.data.length > 2) {
      if (res[0].data.data[2].status !== 3) {
        setTasksDone([]);
      }
    }

    for (const tasks in res[0].data.data) {
      console.log(res[0].data.data[tasks].status);
      if (res[0].data.data[tasks].status == 1) {
        setTasksToDo(res[0].data.data[tasks].tasks);
      }
      if (res[0].data.data[tasks].status == 2) {
        setTasksInPr(res[0].data.data[tasks].tasks);
      }
      if (res[0].data.data[tasks].status == 3) {
        setTasksDone(res[0].data.data[tasks].tasks);
      }
    }
  };
  console.log(tasksToDo);
  console.log('ITEEEM');

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <StyledMain>
            <Board id="board-1" title="To do">
              {tasksToDo.length > 0 ? (
                tasksToDo.map((item) => (
                  <Card
                    id={item.idTask}
                    status={item.status}
                    description={item.description}
                    start={item.startDate}
                    content={item.title}
                    deadline={item.expectedEndDate}
                    created={item.createdOn}
                    users={item.assignedUsers}
                    avatars={item.assignedUserAvatars}
                    priority={item.priority}
                    taskId={item.idTask}
                    reloadTasks={deleteTask}
                  />
                ))) : (
                  <div />
              )}
            </Board>

            <Board id="board-2" title="In progress">

              {tasksInpr.length > 0 ? (
                tasksInpr.map((item) => (
                  <Card
                    id={item.idTask}
                    status={item.status}
                    description={item.description}
                    start={item.startDate}
                    content={item.title}
                    deadline={item.expectedEndDate}
                    created={item.createdOn}
                    users={item.assignedUsers}
                    avatars={item.assignedUserAvatars}
                    priority={item.priority}
                    taskId={item.idTask}
                    reloadTasks={deleteTask}
                  />
                ))) : (
                  <div />
              )}
            </Board>

            <Board id="board-3" title="Done">
              {tasksDone.length > 0 ? (
                tasksDone.map((item) => (
                  <Card
                    id={item.idTask}
                    status={item.status}
                    description={item.description}
                    start={item.startDate}
                    content={item.title}
                    deadline={item.expectedEndDate}
                    created={item.createdOn}
                    users={item.assignedUsers}
                    avatars={item.assignedUserAvatars}
                    priority={item.priority}
                    taskId={item.idTask}
                    reloadTasks={deleteTask}
                  />
                ))) : (
                  <div />
              )}
            </Board>

            <Board id="board-4" title="Notes">
              <Card id="card-4" content="Notes" />
            </Board>
          </StyledMain>
        </Grid>

      </Grid>
    </div>
  );
};

export default TaskDashboard;
