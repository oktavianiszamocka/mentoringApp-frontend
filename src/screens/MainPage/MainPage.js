import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { makeStyles } from '@material-ui/styles';

import Post from '../shared/components/Post';

const useStyles = makeStyles({
  postContainer: {
    display: 'grid',
    gridTemplateColumns: '250px 70%',
  },
  asideContainer: {},
  postsContainer: {},
});

function MainPage({ postsStore, authStore }) {
  const user = { firstName: 'John', lastName: 'Doe', imageUrl: '' };

  const classes = useStyles();

  useEffect(() => {
    postsStore.getPosts();
  }, []);

  return (
    <section className={classes.postContainer}>
      <aside className={classes.asideContainer}>
        <div>aaaa</div>
      </aside>
      <div className={classes.postsContainer}>
        {postsStore.posts.map((p) => (
          <Post text={p.content} user={user} />
        ))}
      </div>
    </section>
  );
}

export default inject('postsStore', 'authStore')(observer(MainPage));
