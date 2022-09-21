import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT } from "../vars";

export const fetchShifts = createAsyncThunk(
  "shifts/fetchShifts",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${PORT}/shifts`);
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data.reverse();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setNewShift = createAsyncThunk(
  "shifts/setNewShift",
  async function (_, { rejectWithValue, dispatch }) {
    let newShift = "";
    let newID = new Date().getTime();

    newShift = {
      id: newID,
      startTime: new Date().toISOString(),
      endTime: "",
    };

    console.log(newShift);

    try {
      const response = await fetch(`${PORT}/shifts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShift),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Unable to start shift");
      }

      dispatch(createNewShift(newShift));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const finishShift = createAsyncThunk(
  "shifts/finishShift",
  async function (activeShift, { rejectWithValue, dispatch }) {
    const shift = { ...activeShift, endTime: new Date().toISOString() };
    try {
      const response = await fetch(`${PORT}/shifts/${shift.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shift),
      });
      if (!response.ok) {
        throw new Error("Unable to finish shift");
      }
      dispatch(finishActiveShift(shift));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const shiftsSlice = createSlice({
  name: "shifts",
  initialState: {
    shifts: [],
    fetchStatus: null,
    error: null,
    activeShiftStatus: null,
    activeShift: null,
  },
  reducers: {
    createNewShift(state, action) {
      state.shifts.push(action.payload);
      state.activeShift = action.payload;
      localStorage.setItem("activeShift", JSON.stringify(action.payload));
    },
    finishActiveShift(state, action) {
      state.shifts.map((shift) => {
        if (shift.id === action.payload.id) {
          shift = action.payload;
        }
      });
      localStorage.removeItem("activeShift");
      state.activeShift = null;
      state.activeShiftStatus = null;
    },
    checkLocalActiveShift(state) {
      const activeShift = JSON.parse(localStorage.getItem("activeShift"));
      if (activeShift) {
        state.activeShift = activeShift;
        state.activeShiftStatus = "active";
      }
    },
  },
  extraReducers: {
    [fetchShifts.pending]: (state) => {
      state.status = "loadiing";
      state.error = null;
    },
    [fetchShifts.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.shifts = action.payload;
    },
    [fetchShifts.rejected]: setError,
    [setNewShift.pending]: (state) => {
      state.activeShiftStatus = "pending";
      state.error = null;
    },
    [setNewShift.fulfilled]: (state) => {
      state.activeShiftStatus = "active";
      state.error = null;
    },
    [setNewShift.rejected]: setError,
  },
});

const { createNewShift, finishActiveShift } = shiftsSlice.actions;
export const { checkLocalActiveShift } = shiftsSlice.actions;
export default shiftsSlice.reducer;
