import { configureStore } from "@reduxjs/toolkit";
import shiftReducer from "./shiftSlice";
import shiftInfoReducer from "./shiftInfoSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    shifts: shiftReducer,
    shiftInfo: shiftInfoReducer,
    userInfo: userReducer,
  },
});
