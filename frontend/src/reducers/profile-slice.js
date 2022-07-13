import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alertActions } from "./alert-slice";

const initialState = {
  profile: null,
  status: null,
  profiles: [],
  repos: [],
  loading: false,
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
      return null;
    }
  }
);

export const createProfile = createAsyncThunk(
  "create",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/profile/",
        body.profileForm,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (body.edit === true) {
        thunkAPI.dispatch(
          alertActions.setAlert({
            msg: "profile edited successfully",
            alertType: "success",
          })
        );
      } else {
        thunkAPI.dispatch(
          alertActions.setAlert({
            msg: "profile created successfully",
            alertType: "success",
          })
        );
      }

      console.log(response.data);

      return response.data;
    } catch (err) {
      const errors = err.response.data.msg;
      console.log(errors);
      errors.map((error) =>
        thunkAPI.dispatch(
          alertActions.setAlert({ msg: error.msg, alertType: "danger" })
        )
      );

      return thunkAPI.rejectWithValue(errors);
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

export const deleteEdc = createAsyncThunk("deleteEdc", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/profile/education/${id}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    console.log(response.data);

    thunkAPI.dispatch(
      alertActions.setAlert({ msg: "education removed", alertType: "success" })
    );

    return response.data;
  } catch (err) {
    const error = err.response.data;
    thunkAPI.dispatch(
      alertActions.setAlert({ msg: error.msg, alertType: "danger" })
    );
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteExp = createAsyncThunk("deleteExp", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/profile/experience/${id}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    console.log(response.data);

    thunkAPI.dispatch(
      alertActions.setAlert({ msg: "experience removed", alertType: "success" })
    );

    return response.data;
  } catch (err) {
    const error = err.response.data;
    thunkAPI.dispatch(
      alertActions.setAlert({ msg: error.msg, alertType: "danger" })
    );
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteAcc = createAsyncThunk("deleteAcc", async (thunkAPI) => {
  try {
    const response = await axios.delete("http://localhost:5000/api/profile", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    console.log(response.data);

    thunkAPI.dispatch(
      alertActions.setAlert({ msg: "Account removed", alertType: "success" })
    );

    return response.data;
  } catch (err) {
    const error = err.response.data;
    thunkAPI.dispatch(
      alertActions.setAlert({ msg: error.msg, alertType: "danger" })
    );
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAllProfiles = createAsyncThunk(
  "getAllProfiles",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/api/profile");

      console.log(response.data);

      return response.data;
    } catch (err) {
      const error = err.response.data;
      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProfileById = createAsyncThunk(
  "getProfileById",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profile/user/${userId}`
      );

      console.log(response.data);

      return response.data;
    } catch (err) {
      const error = err.response.data;
      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGithubRepos = createAsyncThunk(
  "getGithubRepos",
  async (username, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profile/github/${username}`
      );

      console.log(response.data);

      return response.data;
    } catch (err) {
      const error = err.response.data;
      thunkAPI.dispatch(
        alertActions.setAlert({ msg: error.msg, alertType: "danger" })
      );
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,

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
      state.loading = true;
    },
    [getCurrentProfile.rejected]: (state, action) => {
      console.log("GET rejected");
      state.loading = false;
      state.profile = null;
      const errs = action.payload.map((err) => err.msg);
      state.errors = errs.map((err) => err);
      console.log(state.errors);
    },

    //  createProfile
    [createProfile.fulfilled]: (state, action) => {
      console.log("POST fulfilled");
      state.loading = false;
      state.profile = action.payload.Profile;
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
      state.profile = action.payload;
      state.errors = null;
      state.loading = false;
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
      state.profile = action.payload;
      state.errors = null;
      state.loading = false;
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

    //   deleteExperience
    [deleteExp.fulfilled]: (state, action) => {
      console.log(" delete exp fulfilled");
      state.profile = action.payload.profile;
      state.errors = null;
      state.loading = false;
    },
    [deleteExp.pending]: (state, action) => {
      console.log("delete exp pending");
      // state.loading = true;
    },
    [deleteExp.rejected]: (state, action) => {
      console.log("delete exp rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },

    //   deleteEducation
    [deleteEdc.fulfilled]: (state, action) => {
      console.log(" delete edc fulfilled");
      state.profile = action.payload.profile;
      state.errors = null;
      state.loading = false;
    },
    [deleteEdc.pending]: (state, action) => {
      console.log("delete edc pending");
    },
    [deleteEdc.rejected]: (state, action) => {
      console.log("delete edc rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },

    //   deleteACC
    [deleteAcc.fulfilled]: (state, action) => {
      console.log(" delete Acc fulfilled");
      state.profile = null;
      state.errors = null;
      state.loading = false;
    },
    [deleteAcc.pending]: (state, action) => {
      console.log("delete Acc pending");
    },
    [deleteAcc.rejected]: (state, action) => {
      console.log("delete Acc rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },

    //   getAllProfiles
    [getAllProfiles.fulfilled]: (state, action) => {
      console.log(" getAllProfiles fulfilled");
      state.profiles = action.payload;
      state.loading = false;
    },
    [getAllProfiles.pending]: (state, action) => {
      console.log("getAllProfiles pending");
      state.loading = true;
    },
    [getAllProfiles.rejected]: (state, action) => {
      console.log("getAllProfiles rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },

    //   getProfileById
    [getProfileById.fulfilled]: (state, action) => {
      console.log(" getProfileById fulfilled");
      state.profile = action.payload.profile;
      state.loading = false;
    },
    [getProfileById.pending]: (state, action) => {
      console.log("getProfileById pending");
      state.loading = true;
      state.profile = null;
    },
    [getProfileById.rejected]: (state, action) => {
      console.log("getProfileById rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },

    //   getGithubrepos
    [getGithubRepos.fulfilled]: (state, action) => {
      console.log(" getGithubRepos fulfilled");
      state.repos = action.payload;
      console.log(state.repos);
      state.loading = false;
    },
    [getGithubRepos.pending]: (state, action) => {
      console.log("getGithubRepos pending");
    },
    [getGithubRepos.rejected]: (state, action) => {
      console.log("getAGithubRepos rejected");
      state.loading = false;
      state.errors = action.payload;
      console.log(state.errors);
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
