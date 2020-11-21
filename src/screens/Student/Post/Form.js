import React, { useState, useEffect } from 'react';
import {
  Formik, Form, useFormik, Field, ErrorMessage, FieldArray,
} from 'formik';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import MUIRichTextEditor from 'mui-rte';
import { InputBase, IconButton, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

import postFont from '../../../globals/postFont';

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

// const PostSchema = Yup.object().shape({
//   title: Yup.string().required(),
//   subtitle: Yup.string(),
//   text: Yup.string().required(),
//   tags: Yup.string(),
// });

const useStyles = makeStyles({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
});

export default function UpsertPostForm({ initialValues, onSubmit, user }) {
  const classes = useStyles();
  const [post, setPost] = useState({
    title: 'cos',
    message: 'cos innego',
    tags: ['tag1', 'tag2'],
  });

  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [key, setKey] = useState(0);

  // TODO delete
  const onSubmitTest = (values, { setSubmitting }) => {
    // console.log(values);
    setSubmitting(false);
  };

  const handleAddTag = (e) => {
    const newTags = [...tags, { id: key, label: tag }];
    setTags(newTags); // todo add elements
    setKey(key + 1);
  };

  const handleTagDelete = (arrayHelper, chipToDelete) => {
    arrayHelper.remove(chipToDelete);
  };

  const addIcon = <AddIcon onClick={handleAddTag} />;

  return (
    <Formik onSubmit={onSubmitTest} initialValues={post}>
      <Form style={{ maxWidth: '900px' }}>
        <StyledSection>
          <div style={{ display: 'flex' }}>
            <StyledImg src={user && user.imageUrl} width="75px" />
            <TextField
              style={{ marginTop: '20px', width: '100%' }}
              name="title"
              label="Enter title here"
              variant="outlined"
            />
            <ErrorMessage name="title" component="div" />
          </div>

          <div style={messageStyle}>
            <MUIRichTextEditor
              name="message"
              label="Enter here the post message..."
              inlineToolbar
              fullWidth
            />
          </div>
          <hr />

          <FieldArray
            name="tags"
            render={(ah) => (
              <>
                <Grid item xs={12} alignItems="center" justify="center" style={{ margin: '20px' }}>
                  <TextField
                    size="small"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    style={{ width: '150px', verticalAlign: 'pointer' }}
                    label="Add tag"
                    variant="outlined"
                  />
                  <AddIcon
                    style={{ padding: '10px', cursor: 'pointer' }}
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
                      style={{ marginRight: '4px', marginLeft: '15px', marginBottom: '1px' }}
                    />
                  ))
                ) : (
                  <div>There are no tags...</div>
                )}
              </>
            )}
          />

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
}

UpsertPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

UpsertPostForm.defaultProps = {
  initialValues: {
    title: '',
    text: '',
    tags: '',
  },
};
