import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../../types/auth";

const initialState: AuthState = {
  isLoading: false,
  error: null,
  successMessage: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action untuk mulai loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Action untuk set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Action untuk set success message
    setRegisterSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    setLoginSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    setLogoutSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.isLoading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    },

    // Action untuk clear messages
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setRegisterSuccess,
  setLoginSuccess,
  setLogoutSuccess,
  clearMessages,
} = authSlice.actions;
export default authSlice.reducer;
