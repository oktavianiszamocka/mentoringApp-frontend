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

  const [showDetail, setShowDetail] = useState(false);

  const handleClose = () => {
    setShowDetail(false);
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
  };

  return (
    <StyledDiv
      id={props.id}
      draggable="true"
      onDragStart={dragStart}
      onDragOver={dragOver}
    >

      <StyledDiv2 onClick={showCom}>
        {(() => {
          if (showDetail) {
            return (
              <TaskDetail handleClose={handleClose} />
            );
          }
        })()}
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
            <StyledP>{props.content}</StyledP>
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
        </StyledDiv3>
        <StyledDiv2>
          <EditIcon fontSize="small" className={classes.edit} />
          <DeleteIcon fontSize="small" className={classes.delete} />
        </StyledDiv2>
      </StyledDiv2>
      {props.children}
    </StyledDiv>
  );
}

export default Card;