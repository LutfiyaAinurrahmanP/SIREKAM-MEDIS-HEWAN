import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import registerFormReducer from "./slices/auth/registerFormSlice";
import loginFormReducer from "./slices/auth/loginFormSlice";
import employeesReducer from "./slices/employees/employeesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registerForm: registerFormReducer,
    loginForm: loginFormReducer,

    employees: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
