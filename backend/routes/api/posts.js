const express = require("express");
const Post = require("../../models/PostsModel");
const checkAuth = require("../../middleware/checkAuth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Profile = require("../../models/ProfileModel");

const router = express.Router();

//@route     POST request api/posts
//@desc      create new post
//@access    private

router.post(
  "/",
  [checkAuth, check("text").not().isEmpty()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(500).json({ msg: "text field must be filled" });
    }

    let user;
    let newPost;

    try {
      user = await User.findById(req.userData).select("-password");

      newPost = new Post({
        text: req.body.text,
        user: req.userData,
        name: user.name,
        avatar: user.avatar,
      });

      await newPost.save();

      res.json({ post: newPost });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "could not find user or create new post" });
    }
  }
);

//@route     GET request api/posts
//@desc      get all posts
//@access    private

router.get("/", checkAuth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts || posts.length === 0) {
      return res.status(500).json({ msg: "no posts were found!" });
    }

    res.json({ posts: posts });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
});

//@route     GET request api/posts/:postId
//@desc      get specific post with postId
//@access    private

router.get("/:postId", checkAuth, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(500).json({ msg: "no post is found!" });
    }

    res.json(post);
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
});

//@route     DELETE request api/posts/:postId
//@desc      delete a post
//@access    private

router.delete("/:postId", checkAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(500).json({ msg: "no post is found!" });
    }

    if (post.user.toString() !== req.userData) {
      return res
        .status(401)
        .json({ msg: "you are not authorized to do that!!" });
    }

    await post.remove();

    res.json({ msg: "deleted post!" });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
});

//@route     PUT request api/posts/like/:Id
//@desc      add a like
//@access    private

router.put("/like/:Id", checkAuth, async (req, res) => {
  const { Id } = req.params;

  console.log(Id);

  try {
    const post = await Post.findById(Id);

    const filteredLikes = post.likes.filter(
      (like) => like.user.toString() === req.userData
    );

    if (filteredLikes.length > 0) {
      return res.status(400).json({ msg: "post already been liked!" });
    }

    post.likes.unshift({ user: req.userData });

    await post.save();

    const payload = [post.likes, Id];

    res.json(post.likes);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//@route     PUT request api/posts/unlike/:Id
//@desc      unlike
//@access    private

router.put("/unlike/:Id", checkAuth, async (req, res) => {
  const { Id } = req.params;

  try {
    const post = await Post.findById(Id);

    const filteredLikes = post.likes.filter(
      (like) => like.user.toString() === req.userData
    );

    if (filteredLikes.length === 0) {
      return res.status(400).json({ msg: "cannot remove like" });
    }

    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.userData
    );

    await post.save();

    res.json(post.likes);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//@route     PUT request api/posts/comments/:postId
//@desc      add a comment to a post
//@access    private

router.put(
  "/comments/:postId",
  [checkAuth, check("text").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ msg: "text field must not be empty" });
    }
    try {
      const user = await User.findById(req.userData).select("-password");

      const newComment = {
        user: req.userData,
        name: user.name,
        avatar: user.avatar,
        text: req.body.text,
      };

      const post = await Post.findById(req.params.postId);

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      return res.status(500).json({ msg: "server error" });
    }
  }
);

//@route     DELETE request api/posts/comments/:postId/:commentId
//@desc      delete comment from post
//@access    private

router.delete("/comments/:postId/:commentId", checkAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.filter(
      (com) => com.id === req.params.commentId
    );
    console.log(comment[0]);

    if (!comment || comment.length === 0) {
      return res.status(500).json({ msg: "no comment is found " });
    }

    console.log(comment[0].user);
    console.log(comment[0].user.toString());
    console.log(req.userData);
    if (comment[0].user.toString() !== req.userData) {
      return res.status(401).json({ msg: "you are not allowed!!" });
    }

    // post.comments.splice(comment[0], 1);
    console.log(comment[0].id);
    post.comments.map((com) => console.log(com.id));
    post.comments = post.comments.filter((com) => com.id !== comment[0].id);

    console.log(post.comments);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
