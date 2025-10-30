import { useState } from 'react';

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSuccess = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success'
    });
  };

  const showError = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
  };

  const showWarning = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: 'warning'
    });
  };

  const showInfo = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: 'info'
    });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return {
    snackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar
  };
};

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = async (asyncFunction) => {
    try {
      setLoading(true);
      const result = await asyncFunction();
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    withLoading
  };
};
