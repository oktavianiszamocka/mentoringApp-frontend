import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
`;

const StyledSpan = styled.span`
  font-family: 'Open Sans Condensed', sans-serif;
  background-color: #c0c0c0;
  border-radius: 25px;
  border: 2px solid #c0c0c0;
  padding: 10px;
  margin: 3px;
  width: 120px;
  height: 50px;
`;

const TagsComponent = ({ tags, spanTheme }) => {
  return (
    <StyledDiv>
      {tags.map((tag) => (
<<<<<<< HEAD
        <StyledSpan spanTheme={spanTheme}>{tag}</StyledSpan>
=======
        <StyledSpan key={tag.IdTag} spanTheme={spanTheme}>
          {tag.Name}
        </StyledSpan>
>>>>>>> f231c557f96b28a1107595e6f3a4ed61230391b6
      ))}
    </StyledDiv>
  );
};

export default TagsComponent;
