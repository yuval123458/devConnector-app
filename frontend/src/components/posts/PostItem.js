import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../reducers/post-slice";
import { unlikePost } from "../../reducers/post-slice";
import { useState } from "react";

const PostItem = (props) => {
  const curUser = useSelector((state) => state.auth.user);
  const { post } = props;
  const { _id: postId, text, name, avatar, user, likes, comments, date } = post;
  const filtered = post.likes.filter((like) => like.user === curUser.user._id);
  const [likeDisable, setLikeDisable] = useState(
    filtered.length > 0 ? true : false
  );
  const [unlikeDisable, setUnLikeDisable] = useState(
    filtered.length === 0 ? true : false
  );

  console.log(post);
  const dispatch = useDispatch();

  const likesHandler = () => {
    dispatch(likePost(postId));

    setUnLikeDisable((prev) => !prev);

    setLikeDisable((prev) => !prev);
  };

  const dislikeHandler = () => {
    dispatch(unlikePost(postId));

    setUnLikeDisable((prev) => !prev);

    setLikeDisable((prev) => !prev);
  };

  const deleteHandler = () => {
    props.onDelete(postId);
  };

  let Post = (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="avatar-img" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button
          disabled={likeDisable}
          onClick={likesHandler}
          type="button"
          className={`btn btn-light ${likeDisable ? "disabled" : ""}`}
        >
          <i className="fas fa-thumbs-up"></i>{" "}
          {likes.length > 0 && <span>{likes.length} </span>}
        </button>
        <button
          disabled={unlikeDisable}
          onClick={dislikeHandler}
          type="button"
          className={`btn btn-light ${unlikeDisable ? "disabled" : ""}`}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/posts/${postId}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count"> {comments.length}</span>
          )}
        </Link>
        {curUser.user._id === user && (
          <button
            onClick={deleteHandler}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );

  return Post;
};
export default PostItem;
