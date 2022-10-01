import { createSlice } from "@reduxjs/toolkit";

const shiftInfoSlice = createSlice({
  name: "shiftInfo",
  initialState: {
    shiftInfoStatus: false,
    activeShiftInfo: null,
    deleteModuleStatus: false,
    editModuleStatus: false,
    addModuleStatus: false,
  },
  reducers: {
    toggleShiftInfo(state, action) {
      if (!action.payload) {
        state.shiftInfoStatus = false;
        return;
      }
      if (action.payload === true) {
        state.shiftInfoStatus = true;
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
    toggleAddModuleStatus(state) {
      state.addModuleStatus = !state.addModuleStatus;
    },
    toggleEditModuleStatus(state) {
      state.editModuleStatus = !state.editModuleStatus;
    },
    updateActiveShiftInfo(state, action) {
      state.activeShiftInfo = action.payload;
    },
  },
});

export const {
  toggleShiftInfo,
  toggleDeleteModuleStatus,
  toggleAddModuleStatus,
  toggleEditModuleStatus,
  updateActiveShiftInfo,
} = shiftInfoSlice.actions;
export default shiftInfoSlice.reducer;
