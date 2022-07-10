import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../../reducers/post-slice";
import { useEffect } from "react";
import { Fragment } from "react";
import PostItem from "./PostItem";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  console.log(posts);

  useEffect(() => {
    dispatch(getPosts()).unwrap();
  }, []);

  return (
    <Fragment>
      {" "}
      {!posts ? (
        <p>loading...</p>
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community!
          </p>
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Posts;
