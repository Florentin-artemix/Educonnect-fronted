import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ConfirmDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  title = 'Confirmation', 
  message = 'Êtes-vous sûr de vouloir continuer ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  severity = 'warning'
}) => {
  const getButtonColor = () => {
    switch (severity) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm} 
          color={getButtonColor()}
          variant="contained"
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
