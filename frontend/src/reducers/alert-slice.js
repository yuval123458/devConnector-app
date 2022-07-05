import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alerts: [],
  },
  reducers: {
    setAlert(state, action) {
      const id = uuidv4();
      const ob = {
        msg: action.payload.msg,
        alertType: action.payload.alertType,
        id,
      };
      state.alerts.push(ob);
    },
    removeAlert(state, action) {
      if (state.alerts) {
        console.log("state alerts is defined");
        state.alerts = state.alerts.filter(
          (alert) => alert.id !== action.payload
        );
      }
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
