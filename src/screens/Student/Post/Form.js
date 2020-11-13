import React, { useState, useEffect } from 'react';
import {
  Formik, Form, useFormik, Field,
} from 'formik';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
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

export default function UpsertPostForm(props) {
  const classes = useStyles();
  const [tag, setTag] = useState('aa');
  const [tags, setTags] = useState([]);
  const [key, setKey] = useState(0);

  const handleSubmitTag = (e) => {
    { console.log(tag); }
    const newTags = [
      ...tags,
      { id: key, label: tag },
    ];
    console.log(newTags);
    setTags(newTags); // todo add elements
    setKey(key + 1);
    { console.log(tags); }
  };

  const handleDelete = (chipToDelete) => {
    setTags(tags.filter((tag) => tag.id !== chipToDelete.id));
  };

  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
  });

  const addIcon = <AddIcon onClick={handleSubmitTag} />;

  return (
    <Formik
      onSubmit={props.onSubmit}
      // validationSchema={PostSchema}
      initialValues={props.initialValues}
    >
      <Form>
        <StyledSection>
          <div style={{ display: 'flex' }}>
            <StyledImg src={props.user && props.user.imageUrl} width="75px" />
            <TextField style={{ marginTop: '20px', fontFamily: postFont.fontFamily }} name="title" label="Enter title here" variant="outlined" />
          </div>
          <Grid container>
            <TextField multiline InputProps={{ classes }} style={{ fontFamily: postFont.fontFamily, margin: '16px', width: '70rem' }} name="text" label="Input post text" />
            <Grid item xs={12}>
              <TextField size="small" onChange={(e) => { setTag(e.target.value); }} style={{ margin: '15px', width: '150px' }} name="tag" label="Add tag" variant="outlined" InputProps={{ endAdornment: addIcon }} />
            </Grid>
            {tags && tags.map((item) => (
              <Chip
                name="tags[0]"
                color="primary"
                onDelete={() => handleDelete(item)}
                label={item.label}
                style={{ marginRight: '4px', marginLeft: '15px', marginBottom: '1px' }}
              />
            ))}
          </Grid>
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
