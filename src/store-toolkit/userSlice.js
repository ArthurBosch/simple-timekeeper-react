import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT } from "../vars";

export const asyncSignUp = createAsyncThunk(
  "user/signup",
  async function (body, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
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

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: true,
    token: null,
    status: null,
    error: null,
  },
  reducers: {
    signUp(state, action) {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.loggedIn = true;
      state.error = false;
    },
  },
  extraReducers: {
    [asyncSignUp.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [asyncSignUp.fulfilled]: (state) => {
      state.status = "resolved";
      state.error = null;
    },
    [asyncSignUp.rejected]: setError,
  },
});
const { signUp } = userSlice.actions;
export default userSlice.reducer;
