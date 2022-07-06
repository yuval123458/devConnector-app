import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alertActions } from "./alert-slice";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: [],
};

export const getCurrentProfile = createAsyncThunk(
  "reducers/getCurrentProfile",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/profile/me", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      return response.data;
    } catch (err) {
      console.log(err.response.data.msg);
      throw new Error(err.response.data.msg);
    }
  }
);

export const createProfile = createAsyncThunk(
  "create",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/profile/",
        body,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (err) {
      const errors = err.response.data.errors;
      return rejectWithValue(errors);
    }
  }
);

export const addExperience = createAsyncThunk(
  "addExp",
  async (body, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile/experience",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;
      console.log(errors);
      errors.map((err) =>
        thunkAPI.dispatch(
          alertActions.setAlert({ msg: err.msg, alertType: "danger" })
        )
      );
      return thunkAPI.rejectWithValue(errors);
    }
  }
);

export const addEducation = createAsyncThunk(
  "addEdc",
  async (body, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile/education",
        body,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (err) {
      const errors = err.response.data.errors;

      errors.map((err) =>
        thunkAPI.dispatch(
          alertActions.setAlert({ msg: err.msg, alertType: "danger" })
        )
      );

      return thunkAPI.rejectWithValue(errors);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state, action) {
      state.profile = null;
      state.repos = [];
      state.errors = {};
      state.loading = true;
    },
  },
  extraReducers: {
    // GetCurrentProfile
    [getCurrentProfile.fulfilled]: (state, action) => {
      console.log(" GET fulfilled");
      state.profile = action.payload;
      state.loading = false;
      state.errors = null;
    },
    [getCurrentProfile.pending]: (state, action) => {
      console.log("GET pending");
    },
    [getCurrentProfile.rejected]: (state, action) => {
      console.log("GET rejected");
      state.loading = false;
      const errs = action.payload.map((err) => err.msg);
      state.errors = errs.map((err) => err);
      console.log(state.errors);
    },

    //  createProfile
    [createProfile.fulfilled]: (state, action) => {
      console.log("POST fulfilled");
      state.loading = false;
      state.profile = action.payload;
      state.errors = null;
    },
    [createProfile.pending]: (state, action) => {
      console.log("POST pending");
    },
    [createProfile.rejected]: (state, action) => {
      console.log("POST rejected");
      state.loading = false;
      const errs = action.payload.map((err) => err.msg);
      state.errors = errs.map((err) => err);
      console.log(state.errors);
    },

    //   addExperience
    [addExperience.fulfilled]: (state, action) => {
      console.log("exp fulfilled");
      state.loading = false;
      state.profile.experience = action.payload;
      state.errors = null;
    },
    [addExperience.pending]: (state, action) => {
      console.log("exp pending");
    },
    [addExperience.rejected]: (state, action) => {
      console.log("exp rejected");
      state.loading = false;
      const errs = action.payload.map((err) => err.msg);
      state.errors = errs.map((err) => err);
      console.log(state.errors);
    },

    //   addEducation
    [addEducation.fulfilled]: (state, action) => {
      console.log("edc fulfilled");
      state.loading = false;
      state.profile.education = action.payload;
      state.errors = null;
    },
    [addEducation.pending]: (state, action) => {
      console.log("edc pending");
    },
    [addEducation.rejected]: (state, action) => {
      console.log("edc rejected");
      state.loading = false;
      const errs = action.payload.map((err) => err.msg);
      state.errors = errs.map((err) => err);
      console.log(state.errors);
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
