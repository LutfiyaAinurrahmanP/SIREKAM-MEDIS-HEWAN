import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../../types/auth";
import { authStorage } from "../../../utils/authStorage";

const initializeAuthState = (): AuthState => {
  const token = authStorage.getToken();
  const user = authStorage.getUser();
  const isAuthenticated = authStorage.isAuthenticated();

  return {
    isLoading: false,
    error: null,
    successMessage: null,
    user: user,
    isAuthenticated: isAuthenticated,
    token: token,
  };
};

const initialState: AuthState = initializeAuthState();

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

    setLoginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;

      authStorage.setToken(token);
      authStorage.setUser(user);
    },

    setLogoutSuccess: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.token = null;
      state.successMessage = action.payload;
      state.isLoading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;

      authStorage.clearAuth();
    },

    // Action untuk clear messages
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },

    restoreAuth: (state) => {
      const token = authStorage.getToken();
      const user = authStorage.getUser();

      if (token && user) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
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
  restoreAuth,
} = authSlice.actions;
export default authSlice.reducer;
