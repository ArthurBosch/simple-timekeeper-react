import { createSlice } from "@reduxjs/toolkit";

const shiftInfoSlice = createSlice({
  name: "shiftInfo",
  initialState: {
    shiftInfoStatus: false,
    activeShiftInfo: null,
    deleteModuleStatus: false,
  },
  reducers: {
    toggleShiftInfo(state, action) {
      if (!action.payload) {
        state.shiftInfoStatus = false;
        return;
      }
      if (action.payload === true) {
        state.shiftInfoStatus = true;
        console.log(action.payload);
        return;
      }

      if (action.payload === false) {
        state.shiftInfoStatus = false;
        return;
      }
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
    toggleDeleteModuleStatus(state) {
      state.deleteModuleStatus = !state.deleteModuleStatus;
    },
  },
});

export const { toggleShiftInfo, toggleDeleteModuleStatus } =
  shiftInfoSlice.actions;
export default shiftInfoSlice.reducer;
