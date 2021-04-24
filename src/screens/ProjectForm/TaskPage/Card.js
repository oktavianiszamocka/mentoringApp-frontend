import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

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

const StyledP = styled.p`
  font-family: 'Roboto', sans-serif;
  word-break: break-word;
  font-size: 13px;
`;

const useStyles = makeStyles({
  edit: {
    fontSize: '15px',
    marginRight: '5px',
  },
  delete: {
    fontSize: '15px',
  },
});

function Card(props) {
  const classes = useStyles();

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

  return (
    <StyledDiv
      id={props.id}
      draggable="true"
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      <StyledDiv2>
        <StyledP>{props.content}</StyledP>
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
