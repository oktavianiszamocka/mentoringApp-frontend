import React, { useState, useEffect } from 'react';
import Api from '../../../api/index';
import Comment from '../../shared/components/Comment';

const AllComments = (idPost) => {
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    const response = await Promise.all([Api.getPostComment(idPost.idPost)]);
    setComments(response[0].data.data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div>
      {comments
          && comments.map((comment) => (
            <Comment comment={comment} />
          ))}

    </div>

  );
};

export default AllComments;
