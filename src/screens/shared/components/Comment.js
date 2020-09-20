import React from 'react';
import Avatar from '../components/Avatar';
import styled from 'styled-components';
import photo from '../../../assets/images/taylor.jpg';

const user = {
  firstName: 'Joker',
  lastName: 'the Kitty',
  imageUrl: photo.toString(),
  comment: 'That is cool!!',
  time: '1hr ago',
};

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

const Comment = () => {
  return (
    <StyledDiv>
      <Avatar
        firstName={user.firstName}
        lastName={user.lastName}
        imageUrl={user.imageUrl}
        imgTheme={imgTheme}
        spanTheme={spanTheme}
      />
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{user.time}</small>
        <h6 className="mt-2 mb-4 text-muted">{user.comment}</h6>
      </div>
    </StyledDiv>
  );
};

export default Comment;
