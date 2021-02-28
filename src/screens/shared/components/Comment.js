import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAvatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const StyledTitle = styled.p`
  font-family: 'Roboto', arial;
  font-weight: bold;
  font-size: 13px;
  margin: 2px 4px;
  padding: 0px; 
`;

const StyledDiv = styled.div`
  display: flex;
  margin: 6px 1px;
`;

const StyledP = styled.p`
  font-family: 'Roboto', arial;
  font-size: 12px;
  margin: 5px;
`;

const StyledComment = styled.p`
  font-family: 'Roboto', arial;
  font-size: 14px;
  margin: 5px;
`;

const useStyles = makeStyles((theme) => ({
  iconButtonStyle: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
const Comment = ({ comment, loggedUser }) => {
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <StyledTitle>{`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}</StyledTitle>
          {(comment.createdBy.idUser === loggedUser.idUser) && (
            <div>
              {console.log(loggedUser)}
              <EditIcon style={{ marginLeft: '6em', fontSize: 'small' }} />
              <DeleteIcon style={{ marginLeft: '2px', fontSize: 'small' }} />
            </div>
          )}
        </div>
        <StyledP style={{ color: 'rgba(1,1,1,0.5)', marginTop: '-2px' }}>{momentTime}</StyledP>
        <StyledComment>{comment.comment}</StyledComment>
      </StyledDiv>
    </StyledDiv>
  );
};

export default Comment;
