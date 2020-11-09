import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyle } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledSection = styled.section`
  margin: 2rem;
  padding: 1rem;
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
    initialValues={{
      title: '',
      mainText: '',
      tags: [],
    }}
  >
    <Form>
      <StyledSection>
        <div style={{ display: 'flex' }}>
          <StyledImg src={user.imageUrl} width="75px" />
          <div style={{ display: 'inline-grid' }}>
            <Field as={TextField} name="title" label="Write here your title..." />
          </div>
        </div>
        <Field
          as={TextField}
          name="mainText"
          maxLength={300}
          multiline
          style={{ height: '100px' }}
          label="Write here your message..."
          fullWidth
        />
        <Field as={TextField} name="tags" label="Write here your tags..." fullWidth />
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
  // initialValues: PropTypes.object,
};

export default UpsertPostForm;
