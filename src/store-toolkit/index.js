import { configureStore } from "@reduxjs/toolkit";
import shiftReducer from "./shiftSlice";
import shiftInfoReducer from "./shiftInfoSlice";

export default configureStore({
  reducer: {
    shifts: shiftReducer,
    shiftInfo: shiftInfoReducer,
  },
});
