export const CreatePosts = () => {
  return(
    <div className="create_post">
      <h2> Create Post </h2>
      <form>
        <label htmlFor="Topic">  </label>
        <input type="text" id="name" />
      </form>
    </div>
  );
}
/*
import React, { useState } from 'react';
import Web3 from 'web3';
import { PostModel } from '../../../server/src/models/Posts.js'; 

export const CreatePosts = ({ userAddress }) => {
  const [postContent, setPostContent] = useState('');

  const handlePostSubmission = async (e) => {
    e.preventDefault();
    if (!postContent) {
      alert('Please enter post content.');
      return;
    }

    try {
      // Create a new post using the PostModel
      await PostModel.create({
        poster: userAddress,
        post_content: postContent,
      });

      // Clear the post content input
      setPostContent('');

      // Optionally, you can trigger a state update to refresh the post list on your homepage.
      // You may want to pass a function from the parent component to handle the refresh.
      // refreshPosts();
    } catch (error) {
      console.error('Error creating a post:', error);
    }
  };

  return (
    <div className="create_post">
      <h2>Create Post</h2>
      <form onSubmit={handlePostSubmission}>
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};
*/