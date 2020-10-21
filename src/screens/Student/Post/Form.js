import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledSection = styled.section`
  margin: 2rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
`;

const StyledImg = styled.img`
  border-radius: 2.5rem;
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  box-shadow: 1px 1px 2px 0px rgba(135, 135, 135, 1);
  align-self: center;
  margin-right: 40px;
`;
const imgTheme = {
  width: '50px',
  borderRadius: '50%',
};

const PostSchema = Yup.object().shape({
  title: Yup.string().isRequired,
  subtitle: Yup.string(),
  text: Yup.string().isRequired,
  tags: Yup.string().matches(/(\d+)(,\s*\d+)*/),
});

const UpsertPost = (props) => {
  return (
    <Formik
      onSubmit={props.onSubmit}
      validationSchema={PostSchema}
      initialValues={props.initialValues}
    >
      <StyledSection>
        <div style={{ display: 'flex' }}>
          <StyledImg src={props.user && props.user.imageUrl} width="75px" />
          <div style={{ display: 'inline-grid' }}>
            <TextField id="title" name="title" label="title" />
            <TextField id="subtitle" name="subtitle" label="subtitle" />
          </div>
        </div>
        <TextField id="description" name="description" label="description" fullWidth />
        <TextField id="tags" name="tags" label="tags" fullWidth />
        <div style={{ textAlignLast: 'right' }}>
          <Button   
            style={{ margin: '15px' }}
            type="submit"
            color="primary"
            variant="contained"
            autoFocus
          >
            Post
          </Button>
        </div>
      </StyledSection>
    </Formik>
  );
};

export default UpsertPost;
