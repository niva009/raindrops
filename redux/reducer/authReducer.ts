import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: typeof window !== "undefined" && localStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
