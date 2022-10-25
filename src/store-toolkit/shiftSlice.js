import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT } from "../vars";
const token = JSON.parse(localStorage.getItem("token"));

export const fetchShifts = createAsyncThunk(
  "shifts/fetchShifts",
  async function (_, { rejectWithValue }) {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(`${PORT}/shift`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();

      const formattedData = data.map((obj) => {
        const { timestart, timeend, workplaceid, ...objToSend } = obj;
        return {
          ...objToSend,
          timeStart: obj.timestart,
          timeEnd: obj.timeend,
          workplaceId: obj.workplaceid,
        };
      });
      return formattedData.reverse();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setNewShift = createAsyncThunk(
  "shifts/setNewShift",
  async function (workplace, { rejectWithValue, dispatch }) {
    let newShift = "";

    newShift = {
      workplaceId: workplace.id,
      timeStart: new Date().toISOString(),
      wage: workplace.wage,
    };

    try {
      const response = await fetch(`${PORT}/shift`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newShift),
      });

      if (!response.ok) {
        throw new Error("Unable to start shift");
      }

      const data = await response.json();

      dispatch(createNewShift({ ...newShift, id: data.id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const finishShift = createAsyncThunk(
  "shifts/finishShift",
  async function (activeShift, { rejectWithValue, dispatch }) {
    const shift = {
      ...activeShift,
      timeEnd: new Date().toISOString(),
    };
    try {
      const response = await fetch(`${PORT}/shift/${shift.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export const asyncEditShift = createAsyncThunk(
  "shifts/editShift",
  async function (shift, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${PORT}/shift/${shift.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shift),
      });
      if (!response.ok) {
        throw new Error("Unable to edit shift");
      }
      dispatch(editShift(shift));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncDeleteShift = createAsyncThunk(
  "shifts/deleteShift",
  async function (shift, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${PORT}/shift/${shift.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(shift),
      });

      if (!response.ok) {
        throw new Error("Unable to delete shift");
      }

      dispatch(deleteShift(shift));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const asyncAddShift = createAsyncThunk(
  "shifts/addShift",
  async function (shift, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${PORT}/shift`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shift),
      });

      if (!response.ok) {
        throw new Error("Unable to add shift");
      }

      const data = await response.json();
      const { timestart, timeend, workplaceid, ...objToSend } = data;

      dispatch(
        addNewShift({
          ...objToSend,
          timeStart: data.timestart,
          timeEnd: data.timeend,
          workplaceId: data.workplaceid,
        })
      );
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
    status: null,
    error: null,
    activeShiftStatus: null,
    activeShift: null,
  },
  reducers: {
    createNewShift(state, action) {
      state.shifts.unshift(action.payload);
      state.activeShift = action.payload;
      localStorage.setItem("activeShift", JSON.stringify(action.payload));
    },
    finishActiveShift(state, action) {
      const shiftIndex = state.shifts.findIndex(
        (shift) => shift.id === action.payload.id
      );
      state.shifts[shiftIndex] = action.payload;
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
    editShift(state, action) {
      const shiftIndex = state.shifts.findIndex(
        (shift) => shift.id === action.payload.id
      );
      state.shifts[shiftIndex] = action.payload;
    },
    deleteShift(state, action) {
      const newShifts = state.shifts.filter(
        (shift) => shift.id !== action.payload.id
      );
      state.shifts = newShifts;
    },
    addNewShift(state, action) {
      state.shifts.unshift(action.payload);
    },
  },
  extraReducers: {
    [fetchShifts.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchShifts.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.shifts = action.payload;
    },
    [setNewShift.pending]: (state) => {
      state.activeShiftStatus = "loading";
      state.status = "loading";
      state.error = null;
    },
    [setNewShift.fulfilled]: (state) => {
      state.activeShiftStatus = "active";
      state.status = "resolved";
      state.error = null;
    },
    [finishShift.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [finishShift.fulfilled]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [asyncEditShift.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [asyncEditShift.fulfilled]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [asyncDeleteShift.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [asyncDeleteShift.fulfilled]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [asyncAddShift.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [asyncAddShift.fulfilled]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [asyncEditShift.rejected]: setError,
    [fetchShifts.rejected]: setError,
    [finishShift.rejected]: setError,
    [setNewShift.rejected]: setError,
    [asyncAddShift.rejected]: setError,
  },
});

const {
  createNewShift,
  finishActiveShift,
  editShift,
  deleteShift,
  addNewShift,
} = shiftsSlice.actions;
export const { checkLocalActiveShift } = shiftsSlice.actions;
export default shiftsSlice.reducer;
