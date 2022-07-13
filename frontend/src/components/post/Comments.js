import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../reducers/post-slice";

const Comments = (props) => {
  const { comments } = props;
  console.log(comments);
  const dispatch = useDispatch();
  const params = useParams();
  const { postId } = params;
  const curUser = useSelector((state) => state.auth.user);

  if (comments.length === 0) {
    console.log("return");
    return;
  }

  const deleteHandler = async (commentId) => {
    const body = { postId, commentId };
    await dispatch(deleteComment(body)).unwrap();
  };

  return (
    <div className="comments">
      {comments.map((com) => (
        <div key={com._id} className="post bg-white p-1 my-1">
          <Fragment>
            <Link to={`/profile/${com.user}`}>
              <img
                className="round-img"
                src={com.avatar}
                alt="comments-avatar"
              />
              <h4>{com.name}</h4>
            </Link>
          </Fragment>
          <div>
            <p className="my-1">{com.text}</p>
            <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD">{com.date}</Moment>
            </p>
            {curUser.user._id === com.user && (
              <button
                onClick={() => deleteHandler(com._id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Comments;
