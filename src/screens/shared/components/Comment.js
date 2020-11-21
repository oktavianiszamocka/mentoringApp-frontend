import React from 'react';
import Avatar from '../components/Avatar';
import styled from 'styled-components';
import moment from 'moment';


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

const Comment = ({comment}) => {

  var momentTime = moment(JSON.stringify(comment.createdOn), 'YYYY-MM-DD hh:mm:ss').fromNow();
  return (
    <StyledDiv>
      <Avatar {...comment.createdBy} imgTheme={imgTheme} spanTheme={spanTheme} />
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{momentTime}</small>
        <h6 className="mt-2 mb-4 text-muted">{comment.comment}</h6>
      </div>
    </StyledDiv>
  );
};

export default Comment;
