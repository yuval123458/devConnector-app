import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../reducers/post-slice";

const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const val = event.target.value;
    setText(val);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(text);
    await dispatch(createPost(text)).unwrap();

    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={submitHandler} className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create New Post"
          required
          value={text}
          onChange={changeHandler}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};
export default PostForm;
