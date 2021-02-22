import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAvatar from '@material-ui/core/Avatar';

const StyledTitle = styled.p`
  font-family: 'Roboto', arial;
  font-weight: bold;
  font-size: 15px;
  margin: 0px;
  padding: 0px; 
`;

const StyledDiv = styled.div`
  display: flex;
  margin: 8px 5px;
`;

const StyledP = styled.p`
  font-family: 'Roboto', arial;
  font-size: 12px;
  margin: 5px;
`;

const useStyles = makeStyles((theme) => ({
  iconButtonStyle: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
const Comment = ({ comment }) => {
  const momentTime = moment(JSON.stringify(comment.createdOn), 'YYYY-MM-DD hh:mm:ss').fromNow();
  const classes = useStyles();

  return (
    <StyledDiv>
      <IconButton className={classes.iconButtonStyle} href={`/profile/${comment.createdBy.idUser}`}>
        <MaterialAvatar
          src={comment.createdBy.imageUrl}
          style={{
            width: '50px', height: '50px', boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)', borderRadius: '1.5rem',
          }}
        />
      </IconButton>
      <StyledDiv style={{
        backgroundColor: '#d9dbde', borderRadius: '1.5rem', padding: '10px', flexDirection: 'column',
      }}
      >
        <StyledTitle>{comment.createdBy.firstName}</StyledTitle>
        <StyledP style={{ color: 'rgba(1,1,1,0.5)' }}>{momentTime}</StyledP>
        <StyledP>{comment.comment}</StyledP>
      </StyledDiv>
    </StyledDiv>
  );
};

export default Comment;
