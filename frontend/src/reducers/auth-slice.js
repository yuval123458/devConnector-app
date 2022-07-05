import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isAuth: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RegisterSuccess(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuth = true;
      state.isLoading = false;
    },
    RegisterFail(state, action) {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.token = null;
      state.isLoading = false;
    },
    loadUser(state, action) {
      state.isAuth = true;
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
