import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import MaterialAvatar from '@material-ui/core/Avatar';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
  width: 250px;
`;

const StyledDivIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
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
  margin-left: 40px;
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
    marginRight: '5px',
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

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDeadline, settaskDeadline] = React.useState(new Date('2021-06-10T21:11:54'));
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCreator, setTaskCreator] = useState('');
  const [taskCreatedOn, setTaskCreatedOn] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [taskStatus, setTaskStatus] = useState();
  const [taskEnd, setTaskEnd] = useState();
  const [taskStart, setTaskStart] = useState();

  useEffect(() => {
    const loadData = async () => {
      const res = await Promise.all([Api.getTaskDetails(idOfCard)]);
      setTaskTitle(res[0].data.data.title);
      setTaskDescription(res[0].data.data.description);
      setTaskCreator(res[0].data.data.creatorUser);
      setTaskCreatedOn(res[0].data.data.createdOn);
      setTaskPriority(res[0].data.data.priority);
      setAssignedUsers(res[0].data.data.assignedUser);
      setTaskStatus(res[0].data.data.statusName);
      setTaskEnd(res[0].data.data.expectedEndDate);
      setTaskStart(res[0].data.data.startDate);
    };
    loadData();
  }, []);

  const getPositionXY = () => {
    const element = document.getElementById(props.id);
    const rect = element.getBoundingClientRect();
    const { x } = rect;
    const { y } = rect;
    return [x, y];
  };

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
    getPositionXY();
  };

  const hideCom = () => {
    console.log('hidding...');
    setShowDetail(false);
  };

  const hideEdit = () => {
    console.log('hidding...');
    setShowEdit(false);
  };

  const delCom = () => {
    console.log(reload);
    reload(idOfCard);
  };

  const showEditting = () => {
    setShowEdit(true);
  };

  const taskData = {
    idTask: idOfCard,
    title: props.content,
    status: props.status,
    description: props.description,
    startDate: props.start,
    expectedEndDate: deadlineFormat,
    project: 5,
    creator: 9,
    createdOn: props.created,
    priority,
    assignedUsers: props.users,
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
            <StyledP style={{ width: '220px' }}>{props.content}</StyledP>
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
          </StyledDiv2>
          <div>
            <StyledP2 onClick={showCom} style={{ color: 'grey' }}>
              See details

            </StyledP2>
          </div>

        </StyledDiv3>
      </StyledDiv2>
      {(() => {
        if (showDetail) {
          return (
            <TaskDetail cardPosition={getPositionXY()} idT={idOfCard} showDet={hideCom} />
          );
        }
      })()}
      {(() => {
        if (showEdit) {
          return (
            <TaskEdit description={taskDescription} taskInfo={taskData} cardPosition={getPositionXY()} idT={idOfCard} showEdit={hideEdit} />
          );
        }
      })()}
      {props.children}
    </StyledDiv>

  );
}

export default Card;
