import { useState } from "react";
import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

export const CreatePosts = () => {
  return(
    <div className="create-post">
      <CreatePost />
    </div>
  );
}

const CreatePost = () => {
  const [ethereum_address, setEthereumAddress] = useState("");
  const [post_content, setPostContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // sends posters ethereum address and post content to backend to save to db
      const response = await axios.post("http://localhost:3001/create-posts/create", {ethereum_address, post_content});
      console.log(response);
    } catch(err) {
     console.error(err);
    }
  }

  return (
    <Form
      ethereum_address={ethereum_address}
      setEthereumAddress={setEthereumAddress}
      post_content={post_content}
      setPostContent={setPostContent}
      onSubmit={onSubmit}
    />
  )
}

const Form = ({ethereum_address, setEthereumAddress, post_content, setPostContent, onSubmit}) => {
  return(
    <div className="creation-container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="ethereum-address">Ethereum_Address: </label>
          <input 
            type="text"
            id="ethereum-address"
            value={ethereum_address}
            onChange={(event) => setEthereumAddress(event.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="post-content">Post Content: </label>
          <input
            type="text"
            id="post-content"
            value={post_content}
            onChange={(event) => setPostContent(event.target.value)}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}