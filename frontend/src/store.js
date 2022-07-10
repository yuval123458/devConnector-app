import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./reducers/alert-slice";
import authSlice from "./reducers/auth-slice";
import profileSlice from "./reducers/profile-slice";
import postsSlice from "./reducers/post-slice";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    posts: postsSlice.reducer,
  },
});

export default store;
