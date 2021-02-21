import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from './Avatar';

const imgTheme = {
  width: '50px',
  borderRadius: '50%',
};

const spanTheme = {
  fontSize: '1.2rem',
  marginLeft: '1.1rem',
  marginTop: '0.9rem',
};
const StyledDiv = styled.div`
  display: flex;
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
        <Avatar {...comment.createdBy} imgTheme={imgTheme} spanTheme={spanTheme} />
      </IconButton>

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{momentTime}</small>
        <h6 className="mt-2 mb-4 text-muted">{comment.comment}</h6>
      </div>
    </StyledDiv>
  );
};

export default Comment;
