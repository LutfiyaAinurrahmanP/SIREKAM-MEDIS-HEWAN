import { toast } from "react-hot-toast";

export const alertSuccess = async (message: string): Promise<string> => {
  return toast.success(message);
};

export const alertError = async (message: string): Promise<string> => {
  return toast.error(message);
};

// Fungsi alertPromise yang diperbaiki
export const alertPromise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error?: string;
  }
): Promise<T> => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
};
