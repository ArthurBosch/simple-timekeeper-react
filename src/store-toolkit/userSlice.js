import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PORT } from "../vars";

export const asyncSignUp = createAsyncThunk(
  "user/signup",
  async function (body, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${PORT}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to sign up");
      }
      const data = await res.json();
      dispatch(signUp(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const asyncSingIn = createAsyncThunk(
  "user/signin",
  async function (body, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${PORT}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await res.json();
      dispatch(signIn(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const asyncCreateWorkplace = createAsyncThunk(
  "user/createWorkplace",
  async function (body, { rejectWithValue, dispatch }) {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await fetch(`${PORT}/workplace`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await res.json();
      dispatch(createWorkplace(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const checkWorkplaces = createAsyncThunk(
  "user/checkWorkplaces",
  async function (_, { rejectWithValue, dispatch }) {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await fetch(`${PORT}/workplace`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("failed to fetch workplaces");
      }

      const data = await res.json();
      dispatch(getWorkplaces(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    token: null,
    status: null,
    error: null,
    noWorkplace: true,
    workplaces: [],
    activeWorkplace: null,
  },
  reducers: {
    signUp(state, action) {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.loggedIn = true;
      state.token = action.payload.token;
      state.error = false;
    },
    signIn(state, action) {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.token = action.payload.token;
      state.loggedIn = true;
      state.error = false;
    },
    createWorkplace(state, action) {
      state.workplaces.push({ ...action.payload });
      state.noWorkplace = false;
    },
    getWorkplaces(state, action) {
      state.workplaces = [...action.payload];
      if (state.workplaces.length === 0) {
        return;
      }
      state.activeWorkplace = state.workplaces[0];
      state.noWorkplace = false;
    },
    checkAuth(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        state.loggedIn = true;
      }
    },
    changeActiveWorkplace(state, action) {
      state.activeWorkplace = action.payload;
    },
  },
  extraReducers: {
    [asyncSignUp.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [asyncSingIn.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [asyncSignUp.fulfilled]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [asyncSingIn.fulfilled]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [asyncSignUp.rejected]: setError,
    [asyncSingIn.rejected]: setError,
  },
});
const { signUp, signIn, createWorkplace, getWorkplaces } = userSlice.actions;
export const { checkAuth, changeActiveWorkplace } = userSlice.actions;

export default userSlice.reducer;
