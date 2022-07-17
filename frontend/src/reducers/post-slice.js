import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alertActions } from "./alert-slice";

export const createPost = createAsyncThunk(
  "createPost",
  async (text, thunkAPI) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "api/posts",
        { text },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      thunkAPI.dispatch(
        alertActions.setAlert({
          msg: "successfully added post",
          alertType: "success",
        })
      );

      console.log(res.data);

      return res.data;
    } catch (err) {
      const error = err.response.data;

      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPosts = createAsyncThunk("getPosts", async (thunkAPI) => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "api/posts",
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    const error = err.response.data;

    thunkAPI.dispatch(
      alertActions.setAlert({ msg: error.msg, alertType: "danger" })
    );

    return thunkAPI.rejectWithValue(error);
  }
});

export const likePost = createAsyncThunk(
  "likePost",
  async (postId, thunkAPI) => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + `api/posts/like/${postId}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);

      const data = res.data;

      return { data, postId };
    } catch (err) {
      const error = err.response.data;
      console.log(error);

      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );
    }
  }
);

export const unlikePost = createAsyncThunk(
  "unlikePost",
  async (postId, thunkAPI) => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + `api/posts/unlike/${postId}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);

      const data = res.data;

      return { data, postId };
    } catch (err) {
      const error = err.response.data;
      console.log(error);

      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (postId, thunkAPI) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `api/posts/${postId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);

      thunkAPI.dispatch(
        alertActions.setAlert({
          msg: "post deleted successfully",
          alertType: "success",
        })
      );

      return postId;
    } catch (err) {
      const error = err.response.data;
      console.log(error);

      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPost = createAsyncThunk("getPost", async (postId, thunkAPI) => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + `api/posts/${postId}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    const error = err.response.data;
    console.log(error);

    thunkAPI.dispatch(
      alertActions.setAlert({ msg: error.msg, alertType: "danger" })
    );

    return thunkAPI.rejectWithValue(error);
  }
});

export const addComment = createAsyncThunk(
  "addComment",
  async (data, thunkAPI) => {
    try {
      console.log(data.postId);
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + `api/posts/comments/${data.postId}`,
        { text: data.comment },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);

      thunkAPI.dispatch(
        alertActions.setAlert({
          msg: "Comment Added successfully",
          alertType: "success",
        })
      );

      return res.data;
    } catch (err) {
      const error = err.response.data;
      console.log(error);

      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (body, thunkAPI) => {
    try {
      console.log(body);
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL +
          `api/posts/comments/${body.postId}/${body.commentId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);

      thunkAPI.dispatch(
        alertActions.setAlert({
          msg: "Comment Deleted successfully",
          alertType: "success",
        })
      );

      return body.commentId;
    } catch (err) {
      const error = err.response.data;
      console.log(error);

      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );

      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [],
  post: null,
  error: null,
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    // createPost
    [createPost.fulfilled]: (state, action) => {
      console.log("createPost fulfilled");
      state.posts.unshift(action.payload.post);
      state.error = null;
      state.loading = false;
    },
    [createPost.pending]: (state, action) => {
      console.log("createPost pending");
      state.loading = true;
    },
    [createPost.rejected]: (state, action) => {
      console.log("createPost rejected");
      state.post = null;
      state.error = action.payload;
    },

    // getPosts
    [getPosts.fulfilled]: (state, action) => {
      console.log("getPosts fulfilled");
      state.posts = action.payload.posts;
      state.error = null;
      state.loading = false;
    },
    [getPosts.pending]: (state, action) => {
      console.log("getPosts pending");
      state.loading = true;
    },
    [getPosts.rejected]: (state, action) => {
      console.log("getPosts rejected");
      state.posts = [];
      state.error = action.payload;
      console.log(state.error);
      state.loading = false;
    },

    // likePost
    [likePost.fulfilled]: (state, action) => {
      console.log("likePost fulfilled");
      console.log(action.payload);

      state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.likes = action.payload.data;
        }
      });

      state.error = null;
    },
    [likePost.pending]: (state, action) => {
      console.log("likePost pending");
    },
    [likePost.rejected]: (state, action) => {
      console.log("likePost rejected");
      state.posts = null;
      state.error = action.payload;
      console.log(state.error);
    },

    // unlikePost
    [unlikePost.fulfilled]: (state, action) => {
      console.log("unlikePost fulfilled");
      console.log(action.payload);

      state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.likes = action.payload.data;
        }
      });

      state.error = null;
    },
    [unlikePost.pending]: (state, action) => {
      console.log("unlikePost pending");
    },
    [unlikePost.rejected]: (state, action) => {
      console.log("unlikePost rejected");
      state.posts = null;
      state.error = action.payload;
      console.log(state.error);
    },

    // deletePost
    [deletePost.fulfilled]: (state, action) => {
      console.log("deletePost fulfilled");
      console.log(action.payload);
      state.posts.filter((post) => post._id !== action.payload);
      state.error = null;
      state.loading = false;
    },
    [deletePost.pending]: (state, action) => {
      console.log("deletePost pending");
      state.loading = true;
    },
    [deletePost.rejected]: (state, action) => {
      console.log("deletePost rejected");
      state.posts = null;
      state.error = action.payload;
      console.log(state.error);
      state.loading = false;
    },

    // getPost
    [getPost.fulfilled]: (state, action) => {
      console.log("getPost fulfilled");
      state.post = action.payload;
      state.error = null;
      state.loading = false;
    },
    [getPost.pending]: (state, action) => {
      console.log("getPost pending");
      state.loading = true;
    },
    [getPost.rejected]: (state, action) => {
      console.log("getPost rejected");
      state.error = action.payload;
      console.log(state.error);
      state.loading = false;
    },

    // addComment
    [addComment.fulfilled]: (state, action) => {
      console.log("addComment fulfilled");
      state.post.comments = action.payload;
      state.error = null;
      state.loading = false;
    },
    [addComment.pending]: (state, action) => {
      console.log("addComment pending");
      state.loading = true;
    },
    [addComment.rejected]: (state, action) => {
      console.log("addComment rejected");
      state.error = action.payload;
      console.log(state.error);
      state.loading = false;
    },

    // deleteComment
    [deleteComment.fulfilled]: (state, action) => {
      console.log("deleteComment fulfilled");
      state.post.comments = state.post.comments.filter(
        (com) => com._id !== action.payload
      );
      state.error = null;
      state.loading = false;
    },
    [deleteComment.pending]: (state, action) => {
      console.log("deleteComment pending");
      //   state.loading = true;
    },
    [deleteComment.rejected]: (state, action) => {
      console.log("deleteComment rejected");
      state.error = action.payload;
      console.log(state.error);
      state.loading = false;
    },
  },
});

export default postsSlice;
