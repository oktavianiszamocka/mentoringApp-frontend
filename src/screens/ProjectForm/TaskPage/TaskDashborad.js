import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid, Button, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Board from './DragandDrop';
import Card from './Card';
import Header from '../../shared/components/Header';
import Api from '../../../api/index';
import ProjectBar from '../../shared/components/ProjectBar';
import ConfirmDialog from '../../shared/components/ConfirmDialog';

const StyledMain = styled.main`
  display: flex;
  min-height: 678px;
  
  padding: 15px;
`;

const useStyles = makeStyles({
  root: {
    marginTop: '6rem',
  },
  membersDiv: {
    flexGrow: 1,

  },

});

const TaskDashboard = () => {
  const { IdProject } = useParams();
  const classes = useStyles();
  const [isRerender, setIsRerender] = useState(false);
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInpr, setTasksInPr] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [tasksBlock, setTasksBlock] = useState([]);
  const [deleteTaskDialogOptions, setDeleteTaskDialogOptions] = useState({
    title: 'Delete Task',
    mainText: 'Are you sure you want to delete this task?',
    id: null,
    open: false,
  });

  const categorizeTasks = async (response) => {
    for (const tasks in response.data) {
      if (response.data[tasks].status == 1) {
        setTasksToDo(response.data[tasks].tasks);
      }
      if (response.data[tasks].status == 2) {
        setTasksInPr(response.data[tasks].tasks);
      }
      if (response.data[tasks].status == 3) {
        setTasksDone(response.data[tasks].tasks);
      }
      if (response.data[tasks].status == 4) {
        setTasksBlock(response.data[tasks].tasks);
      }
    }
  };

  const loadData = async () => {
    const res = await Promise.all([Api.getProjectTasks(IdProject)]);
    setTasksToDo([]);
    setTasksInPr([]);
    setTasksDone([]);
    setTasksBlock([]);
    categorizeTasks(res[0].data);
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [isRerender]);

  const handleRerender = () => {
    setIsRerender(!isRerender);
  };
  const deleteTask = async (idOfCard) => {
    await Api.deleteTask(idOfCard);
    setIsRerender(!isRerender);
  };

  const onTaskCloseHandler = (id) => {
    setDeleteTaskDialogOptions({
      ...deleteTaskDialogOptions,
      open: true,
      id,
    });
  };

  const onTaskDeleteDialogClosed = async (confirmed, idTask) => {
    if (confirmed) {
      deleteTask(idTask);
    }

    setDeleteTaskDialogOptions({
      ...deleteTaskDialogOptions,
      open: false,
    });
  };

  return (
    <div className={classes.root}>
      <Grid container>

        <Header />

        <Grid item xs={2}>
          <ProjectBar />
        </Grid>

        <Grid item xs={8} container>

          <Typography variant="h4" gutterBottom>Project Tasks</Typography>

          <StyledMain>
            <ConfirmDialog {...deleteTaskDialogOptions} onDialogClosed={onTaskDeleteDialogClosed} />

            <Board id="board-1" title="To do" idStatus="1" handleRerender={handleRerender}>
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
                    reloadTasks={() => onTaskCloseHandler(item.idTask)}
                    handleRerender={handleRerender}

                  />
                ))) : (
                  <div />
              )}
            </Board>

            <Board id="board-2" title="In progress" idStatus="2">

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
                    reloadTasks={() => onTaskCloseHandler(item.idTask)}
                  />
                ))) : (
                  <div />
              )}
            </Board>

            <Board id="board-3" title="Done" idStatus="3">
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
                    reloadTasks={() => onTaskCloseHandler(item.idTask)}
                  />
                ))) : (
                  <div />
              )}
            </Board>

            <Board id="board-4" title="Blocked" idStatus="4">
              {tasksBlock.length > 0 ? (
                tasksBlock.map((item) => (
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
                    reloadTasks={() => onTaskCloseHandler(item.idTask)}
                  />
                ))) : (
                  <div />
              )}

            </Board>
          </StyledMain>
        </Grid>

      </Grid>
    </div>
  );
};

export default TaskDashboard;
