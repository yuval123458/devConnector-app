import { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../reducers/post-slice";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import AddComment from "./AddComment";
import Comments from "./Comments";

const Post = () => {
  const post = useSelector((state) => state.posts.post);
  console.log(post);
  const loading = useSelector((state) => state.posts.loading);

  const params = useParams();
  const { postId } = params;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(postId));
  }, []);

  return (
    <Fragment>
      {loading || !post ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user}`}>
                <img className="round-img" src={post.avatar} alt="" />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
              <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
              </p>
            </div>
          </div>
          <AddComment postId={postId} />
          <Comments comments={post.comments} />
        </Fragment>
      )}
    </Fragment>
  );
};
export default Post;
