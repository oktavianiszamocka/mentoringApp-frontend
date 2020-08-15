import React from 'react';
import Avatar from '../shared/components/Avatar';
import Header from '../shared/components/Header';
import Post from '../shared/components/Post';
import '../../index.css'


const StudentDashboard=()=>{

  const user={
    firstName: "Jan",
    lastName: "Kowalsi",
    imageUrl: "data:image/jpeg;base64,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"
  };

  
  return (
    <div>
      <Header />
      <Post text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat facilisis semper. Fusce ac finibus nisi, ac blandit nisl. Integer sit amet est sed arcu venenatis varius. Suspendisse potenti. Phasellus blandit diam ut leo sodales consequat. Aliquam ut odio euismod, luctus sapien at, dapibus neque. Nunc accumsan lorem dolor. Maecenas sagittis scelerisque nunc quis vulputate. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque vel mi sit amet tortor cursus tempor. Donec dignissim quam eu velit egestas, aliquam ornare eros posuere." user={user} />
    </div>
  );
};

export default StudentDashboard;