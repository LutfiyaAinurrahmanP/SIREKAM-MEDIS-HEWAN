import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormData, LoginFormState } from "../../../types/auth";

const initialState: LoginFormState = {
  formData: {
    username: "",
    password: "",
  },
  showPassword: false,
};

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof LoginFormData; value: string }>
    ) => {
      const { field, value } = action.payload;
      (state.formData[field] as string) = value;
    },

    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },

    resetForm: (state) => {
      state.formData = {
        username: "",
        password: "",
      };
      state.showPassword = false;
    },
  },
});

export const { updateField, toggleShowPassword, resetForm } =
  loginFormSlice.actions;

export default loginFormSlice.reducer;
