import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import registerFormReducer from "./slices/auth/registerFormSlice";
import loginFormReducer from "./slices/auth/loginFormSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registerForm: registerFormReducer,
    loginForm: loginFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
