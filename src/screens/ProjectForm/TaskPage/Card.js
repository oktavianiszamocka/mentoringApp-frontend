import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import MaterialAvatar from '@material-ui/core/Avatar';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {
  Grid, Popover,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import TaskDetail from './TaskDetail';
import TaskEdit from './TaskEdit';
import Api from '../../../api/index';

const StyledDiv = styled.div`
  padding: 15px 25px;
  background-color: white;
  border: 1px solid rgba(1,1,1,0.1);
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
`;

const StyledDivIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-right: 1rem;
  `;

const StyledDiv3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const StyledDiv4 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 0.5rem;
  margin-left: 1rem;
`;
const StyledDiv5 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-left: -19px;
`;
const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 14px;
  margin-top: 1px;
  margin-left: 3px;
  font-weight: bold;
  color: #4d4d4d;
`;

const StyledP2 = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 13px;
  color: #ff4d4d;
  margin: 0px;
  margin-left: 4px;
`;

const useStyles = makeStyles({
  edit: {
    fontSize: '15px',

  },
  delete: {
    fontSize: '15px',

  },
  avatar: {
    width: '32px',
    height: '32px',
    marginLeft: '-10px',
    border: 'solid 1px #a6a6a6',
    zIndex: 1,
  },
  arrowhigh: {
    color: '#ff4d4d',
    fontSize: '20px',
    marginTop: '-7px',
  },
  arrowmedium: {
    color: 'orange',
    fontSize: '20px',
    marginTop: '-7px',
  },
  arrowlow: {
    color: '#5cd65c',
    fontSize: '20px',
    marginTop: '-7px',
  },
  popOverDiv: {
    width: '25rem',
    height: '34rem',
  },
  popoverRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Card(props) {
  const classes = useStyles();

  const { deadline } = props;
  const { priority } = props;

  const deadlineFormat = moment(deadline).format('LL');
  const idOfCard = props.id;
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const reload = props.reloadTasks;
  const handleClose = () => {
    setShowDetail(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const handleClosePop2 = () => {
    setAnchorEl2(null);
  };

  const openPopOver = Boolean(anchorEl);
  const openPopOver2 = Boolean(anchorEl2);
  const id = openPopOver ? 'simple-popover' : undefined;
  const id2 = openPopOver2 ? 'simple-popover' : undefined;

  const [IdTask, setIdTask] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCreator, setTaskCreator] = useState('');
  const [taskCreatedOn, setTaskCreatedOn] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [taskStatus, setTaskStatus] = useState();
  const [taskEnd, setTaskEnd] = useState();
  const [taskStart, setTaskStart] = useState();
  const [project, setProject] = useState();

  useEffect(() => {
    const loadData = async () => {
      const res = await Promise.all([Api.getTaskDetails(idOfCard)]);

      const assignedIds = [];
      res[0].data.data.assignedUser.map((user) => {
        assignedIds.push(user.idUser);
      });
      setIdTask(res[0].data.data.idTask);
      setTaskTitle(res[0].data.data.title);
      setTaskDescription(res[0].data.data.description);
      setTaskCreator(res[0].data.data.creatorUser);
      setTaskCreatedOn(res[0].data.data.createdOn);
      setTaskPriority(res[0].data.data.priority);
      setAssignedUsers(assignedIds);
      setTaskStatus(res[0].data.data.status);
      setTaskEnd(res[0].data.data.expectedEndDate);
      setTaskStart(res[0].data.data.startDate);
      setProject(res[0].data.data.project);
    };
    loadData();
  }, []);

  const updateTaskStatus = async (idOfCard, newstatus) => {
    const taskData = {
      IdTask: idOfCard,
      Status: newstatus,
    };

    await Api.updateTaskStatus(taskData);
  };

  const dragStart = (e) => {
    const { target } = e;
    e.dataTransfer.setData('card_id', target.id);

    setTimeout(() => {
      target.style.display = 'none';
    }, 0);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  const showCom = (e) => {
    setShowDetail(true);
    setAnchorEl(e.currentTarget);
  };

  const hideCom = () => {
    setShowDetail(false);
  };

  const hideEdit = () => {
    setShowEdit(false);
  };

  const delCom = () => {
    reload(idOfCard);
  };

  const showEditting = (e) => {
    setAnchorEl2(e.currentTarget);
    setShowEdit(true);
  };

  const taskData = {
    idTask: IdTask,
    title: taskTitle,
    status: taskStatus,
    description: taskDescription,
    startDate: taskStart,
    expectedEndDate: taskEnd,
    project,
    creator: taskCreator,
    createdOn: taskCreatedOn,
    priority,
    assignedUsers,
  };

  return (
    <StyledDiv
      id={props.id}
      draggable="true"
      onDragStart={dragStart}
      onDragOver={dragOver}
    >

      <StyledDiv2 id="card">
        <StyledDiv3>
          <StyledDiv5>
            {(() => {
              if (priority == 'High') {
                return (
                  <ArrowUpwardIcon className={classes.arrowhigh} />
                );
              } if (priority == 'Medium') {
                return (
                  <ArrowUpwardIcon className={classes.arrowmedium} />
                );
              }
              return (
                <ArrowDownwardIcon className={classes.arrowlow} />
              );
            })()}
            <StyledP style={{ width: '170px' }}>{props.content}</StyledP>
            <StyledDivIcons>
              <EditIcon fontSize="small" className={classes.edit} onClick={showEditting} />
              <DeleteIcon fontSize="small" className={classes.delete} onClick={delCom} />
            </StyledDivIcons>
          </StyledDiv5>
          <StyledDiv2>
            <StyledP2>
              Deadline:
              {' '}
              {deadlineFormat}

            </StyledP2>

          </StyledDiv2>
          <StyledDiv4>
            {props.avatars ? (
              props.avatars.map((item) => (
                <MaterialAvatar
                  className={classes.avatar}
                  src={item}
                />
              ))) : (
                <div />
            )}
          </StyledDiv4>
          <div style={{ marginTop: '0.5rem' }}>
            <StyledP2 onClick={showCom} style={{ color: 'grey' }}>
              See details

            </StyledP2>
          </div>

        </StyledDiv3>
      </StyledDiv2>
      {(() => {
        if (showDetail) {
          return (

            <div>
              <Popover
                open={openPopOver}
                anchorReference="none"
                classes={{
                  root: classes.popoverRoot,
                }}
                onClose={handleClosePop}
              >
                <div className={classes.popOverDiv}>
                  <TaskDetail idT={idOfCard} showDet={hideCom} />
                </div>
              </Popover>
            </div>

          );
        }
      })()}
      {(() => {
        if (showEdit) {
          return (

            <div>
              <Popover
                open={openPopOver2}
                anchorReference="none"
                classes={{
                  root: classes.popoverRoot,
                }}
                onClose={handleClosePop2}
              >
                <div className={classes.popOverDiv}>
                  <TaskEdit
                    taskInfo={taskData}
                    idT={idOfCard}
                    showEdit={hideEdit}
                    reRender={props.handleRerender}
                  />
                </div>
              </Popover>
            </div>

          );
        }
      })()}
      {props.children}
    </StyledDiv>

  );
}

Card.prototype = {
  deadline: PropTypes.string,
  priority: PropTypes.string,
  id: PropTypes.string,
  avatars: PropTypes.object,
  handleRerender: PropTypes.func,
  children: PropTypes.object,
  reloadTasks: PropTypes.func,
  content: PropTypes.string,

};

export default Card;
