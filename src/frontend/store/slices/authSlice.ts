import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';

const initialState: AuthState = {
  isLoading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
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
    setSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    // Action untuk clear messages
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const { setLoading, setError, setSuccess, clearMessages } = authSlice.actions;
export default authSlice.reducer;