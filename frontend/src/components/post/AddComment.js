import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../reducers/post-slice";

const AddComment = ({ postId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { postId, comment };

    dispatch(addComment(data));
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form onSubmit={submitHandler} className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={comment}
          onChange={changeHandler}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};
export default AddComment;
