import { useNavigate } from "react-router";
import {
  setLogoutLoading,
  setLogoutSuccess,
  setLogoutError,
  clearMessages,
} from "../store/slices/auth/authSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { useCallback } from "react";
import { logoutUser } from "../services/authService";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoggingOut, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = useCallback(async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(setLogoutLoading(true));
    dispatch(clearMessages());

    try {
      const result = await logoutUser();

      // Dispatch success action
      dispatch(setLogoutSuccess(result.message));

      // Navigate to login page
      navigate("/login", { replace: true });

      // Optional: Show success message
      // await alertSuccess(result.message);
    } catch (error: any) {
      const errorMessage = error.message || "Logout gagal!";
      dispatch(setLogoutError(errorMessage));

      // Tetap navigate ke login meskipun error
      navigate("/login", { replace: true });

      // Optional: Show error message
      // await alertError(errorMessage);
    }
  }, [dispatch, navigate, isAuthenticated]);

  const confirmLogout = useCallback(() => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      handleLogout();
    }
  }, [handleLogout]);

  return {
    handleLogout,
    confirmLogout,
    isLoggingOut,
    isAuthenticated,
  };
};
