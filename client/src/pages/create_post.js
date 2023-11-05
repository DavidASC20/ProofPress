import { useState } from "react";

export const CreatePosts = () => {
  const [post, registerPost] = useState({
    poster_address: "",
    post_content: "",
  });

  const handleChange = () => {
    const {name, value} = event.target;
    registerPost({...post, [name]: value});
  }

  return(
    <div className="create_post">
      <h2> Create Post </h2>
      <form>
        <label htmlFor="poster_address">  </label>
        <input type="text" id="poster_address" name="poster_address" onChange={handleChange}/>

        <label htmlFor="post_content">  </label>
        <input type="text" id="post_content" />
        
      </form>
    </div>
  );
}