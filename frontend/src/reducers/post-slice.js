import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alertActions } from "./alert-slice";

export const createPost = createAsyncThunk(
  "createPost",
  async (text, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/api/posts", text, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
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
    const res = await axios.get("http://localhost:5000/api/posts", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

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
        `http://localhost:5000/api/posts/like/${postId}`,
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

      //   return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "unlikePost",
  async (postId, thunkAPI) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/unlike/${postId}`,
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

      //   return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [],
  post: null,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    // createPost
    [createPost.fulfilled]: (state, action) => {
      console.log("createPost fulfilled");
      state.post = action.payload.post;
      state.error = null;
    },
    [createPost.pending]: (state, action) => {
      console.log("createPost pending");
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
    },
    [getPosts.pending]: (state, action) => {
      console.log("getPosts pending");
    },
    [getPosts.rejected]: (state, action) => {
      console.log("getPosts rejected");
      state.posts = null;
      state.error = action.payload;
      console.log(state.error);
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
  },
});

export default postsSlice;
