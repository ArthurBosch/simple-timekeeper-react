import { createSlice } from "@reduxjs/toolkit";

const shiftInfoSlice = createSlice({
  name: "shiftInfo",
  initialState: {
    shiftInfoStatus: false,
    activeShiftInfo: null,
  },
  reducers: {
    toggleShiftInfo(state, action) {
      if (
        state.shiftInfoStatus &&
        state.activeShiftInfo.id === action.payload.id
      ) {
        state.shiftInfoStatus = false;
      } else {
        state.shiftInfoStatus = true;
        state.activeShiftInfo = action.payload;
      }
    },
  },
});

export const { toggleShiftInfo } = shiftInfoSlice.actions;
export default shiftInfoSlice.reducer;
