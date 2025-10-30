import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { communicationAPI, userAPI } from '../../services/api';

function CommunicationList() {
  const [communications, setCommunications] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingCommunication, setEditingCommunication] = useState(null);
  const [viewingCommunication, setViewingCommunication] = useState(null);
  const [formData, setFormData] = useState({
    expediteurId: '',
    destinataireId: '',
    sujet: '',
    contenu: '',
    type: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const typeOptions = [
    { value: 'INFORMATION', label: 'Information' },
    { value: 'ALERTE', label: 'Alerte' },
    { value: 'RAPPEL', label: 'Rappel' },
    { value: 'CONVOCATION', label: 'Convocation' },
  ];

  useEffect(() => {
    fetchCommunications();
    fetchUsers();
  }, []);

  const fetchCommunications = async () => {
    try {
      const response = await communicationAPI.getAll();
      setCommunications(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des communications:', error);
      showSnackbar('Erreur lors du chargement des communications', 'error');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  const handleOpen = (communication = null) => {
    if (communication) {
      setEditingCommunication(communication);
      setFormData({
        expediteurId: communication.expediteurId || '',
        destinataireId: communication.destinataireId || '',
        sujet: communication.sujet || '',
        contenu: communication.contenu || '',
        type: communication.type || '',
      });
    } else {
      setEditingCommunication(null);
      setFormData({
        expediteurId: '',
        destinataireId: '',
        sujet: '',
        contenu: '',
        type: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCommunication(null);
  };

  const handleView = (communication) => {
    setViewingCommunication(communication);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setViewingCommunication(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editingCommunication) {
        await communicationAPI.update(editingCommunication.id, formData);
        showSnackbar('Communication modifiée avec succès', 'success');
      } else {
        await communicationAPI.create(formData);
        showSnackbar('Communication créée avec succès', 'success');
      }
      fetchCommunications();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette communication ?')) {
      try {
        await communicationAPI.delete(id);
        showSnackbar('Communication supprimée avec succès', 'success');
        fetchCommunications();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'INFORMATION': return 'info';
      case 'ALERTE': return 'error';
      case 'RAPPEL': return 'warning';
      case 'CONVOCATION': return 'success';
      default: return 'default';
    }
  };

  const getTypeText = (type) => {
    const option = typeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Communications
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Nouvelle communication
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Expéditeur</TableCell>
              <TableCell>Destinataire</TableCell>
              <TableCell>Sujet</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date d'envoi</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communications.map((communication) => (
              <TableRow key={communication.id}>
                <TableCell>{communication.nomExpediteur || '-'}</TableCell>
                <TableCell>{communication.nomDestinataire || '-'}</TableCell>
                <TableCell>
                  {communication.sujet ? 
                    (communication.sujet.length > 50 ? 
                      `${communication.sujet.substring(0, 50)}...` : 
                      communication.sujet) : '-'}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={getTypeText(communication.type)}
                    color={getTypeColor(communication.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {communication.dateEnvoi ? 
                    new Date(communication.dateEnvoi).toLocaleDateString('fr-FR') : '-'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(communication)} color="info">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(communication)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(communication.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog de création/modification */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingCommunication ? 'Modifier la communication' : 'Nouvelle communication'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Expéditeur</InputLabel>
              <Select
                name="expediteurId"
                value={formData.expediteurId}
                onChange={handleChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.nom} {user.prenom} - {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Destinataire</InputLabel>
              <Select
                name="destinataireId"
                value={formData.destinataireId}
                onChange={handleChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.nom} {user.prenom} - {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {typeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="sujet"
              label="Sujet"
              value={formData.sujet}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="contenu"
              label="Contenu"
              value={formData.contenu}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              multiline
              rows={6}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingCommunication ? 'Modifier' : 'Envoyer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de visualisation */}
      <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Détails de la communication
        </DialogTitle>
        <DialogContent>
          {viewingCommunication && (
            <Box sx={{ pt: 2 }}>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Expéditeur:</Typography>
                <Typography>{viewingCommunication.nomExpediteur}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Destinataire:</Typography>
                <Typography>{viewingCommunication.nomDestinataire}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Type:</Typography>
                <Chip 
                  label={getTypeText(viewingCommunication.type)}
                  color={getTypeColor(viewingCommunication.type)}
                  size="small"
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Sujet:</Typography>
                <Typography>{viewingCommunication.sujet}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Contenu:</Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography style={{ whiteSpace: 'pre-wrap' }}>
                    {viewingCommunication.contenu}
                  </Typography>
                </Paper>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Date d'envoi:</Typography>
                <Typography>
                  {viewingCommunication.dateEnvoi ? 
                    new Date(viewingCommunication.dateEnvoi).toLocaleString('fr-FR') : '-'}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Fermer</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CommunicationList;
