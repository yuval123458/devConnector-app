import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../../reducers/post-slice";
import { useEffect } from "react";
import { Fragment } from "react";
import PostItem from "./PostItem";
import { useRef } from "react";
import { deletePost } from "../../reducers/post-slice";
import PostForm from "./PostForm";
import LoadingSpinner from "../layout/LoadingSpinner";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postsRef = useRef();
  postsRef.current = posts;
  const loading = useSelector((state) => state.posts.loading);
  console.log(loading);

  console.log(posts);

  useEffect(() => {
    console.log("useEffect getPosts");
    dispatch(getPosts()).unwrap();
  }, []);

  const deleteHandler = async (postId) => {
    await dispatch(deletePost(postId)).unwrap();

    dispatch(getPosts()).unwrap();
  };

  return (
    <Fragment>
      {!posts ? (
        <div>
          <p>No posts were found. Please add one!</p>
          <PostForm />
        </div>
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community!
          </p>
          <div className="posts">
            <PostForm />
            {loading && !posts && <LoadingSpinner />}
            {posts.map((post) => (
              <PostItem onDelete={deleteHandler} key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Posts;
