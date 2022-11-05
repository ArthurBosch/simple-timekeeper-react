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

export const asyncCheckAuth = createAsyncThunk(
  "user/asyncChechAuth",
  async function (_, { rejectWithValue, dispatch }) {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await fetch(`${PORT}/auth/checkAuth`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Token expired");
      }

      dispatch(completeAuth(token));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const setPending = (state, action) => {
  state.status = "loading";
  state.error = null;
};
const setFullfilled = (state, action) => {
  state.status = "resolved";
  state.error = null;
};
const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
  state.authError = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    token: null,
    status: null,
    error: null,
    authError: null,
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
    signOut(state) {
      localStorage.removeItem("token");
      state.loggedIn = false;
      state.token = null;
      state.activeWorkplace = null;
    },
    createWorkplace(state, action) {
      state.workplaces.push({ ...action.payload });
      state.noWorkplace = false;
      state.activeWorkplace = action.payload;
    },
    getWorkplaces(state, action) {
      state.workplaces = [...action.payload];
      if (state.workplaces.length === 0) {
        state.noWorkplace = true;
        return;
      }
      state.activeWorkplace = state.workplaces[0];
      state.noWorkplace = false;
    },
    completeAuth(state, action) {
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    changeActiveWorkplace(state, action) {
      state.activeWorkplace = action.payload;
    },
  },
  extraReducers: {
    [asyncSignUp.pending]: setPending,
    [asyncSingIn.pending]: setPending,
    [asyncSignUp.fulfilled]: setFullfilled,
    [asyncSingIn.fulfilled]: setFullfilled,
    [asyncCreateWorkplace.pending]: setPending,
    [asyncCreateWorkplace.fulfilled]: setFullfilled,
    [checkWorkplaces.pending]: setPending,
    [checkWorkplaces.fulfilled]: setFullfilled,
    [asyncSingIn.rejected]: setError,
    [asyncSignUp.rejected]: setError,
    [asyncCreateWorkplace.rejected]: setError,
    [checkWorkplaces.rejected]: setError,
    [asyncCheckAuth.rejected]: (state, action) => {
      state.loggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});
const { signUp, signIn, createWorkplace, getWorkplaces, completeAuth } =
  userSlice.actions;
export const { checkAuth, changeActiveWorkplace, signOut } = userSlice.actions;

export default userSlice.reducer;
