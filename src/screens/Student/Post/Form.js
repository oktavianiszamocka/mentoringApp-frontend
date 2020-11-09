import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
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

// const PostSchema = Yup.object().shape({
//   title: Yup.string().required(),
//   subtitle: Yup.string(),
//   text: Yup.string().required(),
//   tags: Yup.string(),
// });

const UpsertPostForm = ({ onNewPostSubmitHandler, user }) => (
  <Formik
    onSubmit={onNewPostSubmitHandler}
    // validationSchema={PostSchema}
    initialValues={{}}
  >
    <Form>
      <StyledSection>
        <div style={{ display: 'flex' }}>
          <StyledImg src={user.imageUrl} width="75px" />
          <div style={{ display: 'inline-grid' }}>
            <Field as={TextField} name="title" label="title" />
          </div>
        </div>
        <Field as={TextField} name="text" label="text" fullWidth />
        <Field as={TextField} name="tags" label="tags" fullWidth />
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
    </Form>
  </Formik>
);

UpsertPostForm.propTypes = {
  onNewPostSubmitHandler: PropTypes.func.isRequired,
  user: PropTypes.exact({
    imageUrl: PropTypes.string.isRequired,
  }),
  // initialValues: PropTypes.object,
};

export default UpsertPostForm;
