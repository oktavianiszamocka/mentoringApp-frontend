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
        <StyledSpan key={tag.IdTag} spanTheme={spanTheme}>
          {tag.Name}
        </StyledSpan>
      ))}
    </StyledDiv>
  );
};

export default TagsComponent;
