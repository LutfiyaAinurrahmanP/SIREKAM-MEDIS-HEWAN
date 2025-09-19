import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RegisterFormData,
  RegisterFormState,
  UserRoleEnum,
} from "../../../types/auth";

const initialState: RegisterFormState = {
  formData: {
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRoleEnum.CLIENT,
    phone: "",
  },
  showPassword: false,
  showConfirmPassword: false,
  isChecked: false,
};

const registerFormSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    // Action untuk update field form
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof RegisterFormData;
        value: string | UserRoleEnum;
      }>
    ) => {
      const { field, value } = action.payload;
      (state.formData[field] as string | UserRoleEnum) = value;
    },

    // Action untuk toggle password visibility
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },

    // Action untuk toggle confirm password visibility
    toggleShowConfirmPassword: (state) => {
      state.showConfirmPassword = !state.showConfirmPassword;
    },

    // Action untuk toggle checkbox
    toggleCheckbox: (state) => {
      state.isChecked = !state.isChecked;
    },

    // Action untuk reset form
    resetForm: (state) => {
      state.formData = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: UserRoleEnum.CLIENT,
        phone: "",
      };
      state.showPassword = false;
      state.showConfirmPassword = false;
      state.isChecked = false;
    },
  },
});

export const {
  updateField,
  toggleShowPassword,
  toggleShowConfirmPassword,
  toggleCheckbox,
  resetForm,
} = registerFormSlice.actions;

export default registerFormSlice.reducer;
