/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ErrorMessage, FieldArray, withFormik } from 'formik';
import MaterialAvatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Grid, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Alert, AlertTitle } from '@material-ui/lab';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { black } from 'material-ui/styles/colors';
// eslint-disable-next-line import/named
import { RichTextEditorDraftjs } from './RichTextEditorDraftJS';

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
  margin-right: 30px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const messageStyle = {
  background: '#eee',
  padding: '10px',
  minHeight: '200px',
};

const useStyles = makeStyles({
  root: {
    maxWidth: '1100px',

  },
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  avatar: {
    width: '70px',
    height: '70px',
    boxShadow: '1px 1px 2px 0px rgba(135, 135, 135, 1)',
    borderRadius: '50%',
  },
  error: {
    color: 'rgb(255,0,0,0.6)',
    marginTop: '2px',
    marginLeft: '100px',
    marginBottom: '10px',
    fontFamily: 'Roboto',
    fontSize: '13px',
  },
  titleStyle: {
    marginTop: '10px',
    marginLeft: '8px',
    width: '100%',
  },
  tagInput: {
    width: '150px',
    verticalAlign: 'pointer',

  },
  chipStyle: {
    marginRight: '4px',
    marginLeft: '15px',
    marginBottom: '1px',
  },
  alert: {
    backgroundColor: 'rgba(255,165,0,0.2)',
    color: 'black',
    width: '170px',
  },
  addIconStyle: {
    padding: '10px',
    cursor: 'pointer',
  },
  postButton: {
    margin: '15px',
  },
  divButtonPost: {
    textAlignLast: 'right',
  },
});

const Yup = require('yup');

const PostForm = (props) => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    user,

  } = props;

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [key, setKey] = useState(0);

  const handleAddTag = (e) => {
    const newTags = [...tags, { id: key, label: tag }];
    setTags(newTags);
    setKey(key + 1);
  };

  const handleTagDelete = (arrayHelper, chipToDelete) => {
    arrayHelper.remove(chipToDelete);
  };

  const addIcon = <AddIcon onClick={handleAddTag} />;

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <StyledSection>
          <div style={{ display: 'flex' }}>
            <MaterialAvatar
              src={user && user.imageUrl}
              className={classes.avatar}
            />
            <TextField
              id="title"
              label="Enter title here"
              error={touched.title && typeof errors.title !== 'undefined'}
              value={values.title}
              onChange={handleChange}
              variant="outlined"
              className={classes.titleStyle}
            />
          </div>
          <ErrorMessage
            name="title"
            component="div"
            className={classes.error} />

          <div style={messageStyle}>

            <RichTextEditorDraftjs
              error={touched.content && typeof errors.content !== 'undefined'}
              editorState={values.content}
              onChange={setFieldValue}
              onBlur={handleBlur}
            />
            <ErrorMessage name="content" />
          </div>
          <hr />
          <FieldArray
            name="tags"
            render={(ah) => (
              <>
                <Grid
                  item
                  xs={12}
                  alignItems="center"
                  justify="center"
                  style={{ margin: '20px' }}
                >
                  <TextField
                    size="small"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className={classes.tagInput}
                    label="Add tag"
                    variant="outlined"
                  />
                  <AddIcon
                    className={classes.addIconStyle}
                    onClick={() => {
                      if (tag && tag.trim().length > 0) ah.push(tag);
                      setTag('');
                    }}
                  />
                </Grid>
                {ah.form.values && ah.form.values.tags.length > 0 ? (
                  ah.form.values.tags.map((item) => (
                    <Chip
                      color="primary"
                      onDelete={() => handleTagDelete(ah, item)}
                      label={item}
                      className={classes.chipStyle}
                    />
                  ))
                ) : (
                  <Alert
                    severity="warning"
                    className={classes.alert}
                    >
                    There are no tags!
                  </Alert>
                )}
              </>
            )}
          />

          <div className={classes.divButtonPost}>
            <Button
              className={classes.postButton}
              type="submit"
              color="primary"
              variant="contained"
              autoFocus
              disabled={!dirty || isSubmitting}
            >
              Post
            </Button>
          </div>

        </StyledSection>
      </div>

    </form>
  );
};
const CreatePostForm = withFormik({
  mapPropsToValues: (props) => ({
    title: props.initialValues && props.initialValues.title || '',
    content: props.initialValues
      && EditorState.createWithContent(ContentState.createFromText(props.initialValues.content))
      || EditorState.createEmpty(),
    tags: props.initialValues && props.initialValues.tags || [],
    user: props.user,
  }),

  validationSchema: Yup.object().shape({
    title: Yup.string()
      .max(255, 'Title should not be longer than 255 characters!')
      .required('Title is required'),
    content: Yup.string()
      .required('Post Content is required'),

  }),

  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    const { blocks } = convertToRaw(values.content.getCurrentContent());
    const contentValue = blocks.map((block) => (!block.text.trim() && '\n') || block.text).join('\n');
    const finalValues = {
      title: values.title,
      content: contentValue,
      tags: values.tags,
    };

    props.formSumbitCallback(finalValues);

    setTimeout(() => {
      setSubmitting(false);

      resetForm({

      });
    }, 1000);
  },

  displayName: 'PostForm',
})(PostForm);

export default CreatePostForm;
