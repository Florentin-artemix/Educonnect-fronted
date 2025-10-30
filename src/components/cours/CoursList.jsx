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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { coursAPI, classeAPI, userAPI } from '../../services/api';

function CoursList() {
  const [cours, setCours] = useState([]);
  const [classes, setClasses] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCours, setEditingCours] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    ponderation: '',
    classeId: '',
    enseignantId: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCours();
    fetchClasses();
    fetchEnseignants();
  }, []);

  const fetchCours = async () => {
    try {
      const response = await coursAPI.getAll();
      setCours(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
      showSnackbar('Erreur lors du chargement des cours', 'error');
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await classeAPI.getAll();
      setClasses(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des classes:', error);
    }
  };

  const fetchEnseignants = async () => {
    try {
      const response = await userAPI.getAll();
      const enseignantsFiltered = response.data.filter(user => 
        user.roles && (user.roles.includes('ENSEIGNANT') || user.roles.includes('ADMIN'))
      );
      setEnseignants(enseignantsFiltered);
    } catch (error) {
      console.error('Erreur lors du chargement des enseignants:', error);
    }
  };

  const handleOpen = (coursItem = null) => {
    if (coursItem) {
      setEditingCours(coursItem);
      setFormData({
        nom: coursItem.nom || '',
        ponderation: coursItem.ponderation || '',
        classeId: coursItem.classeId || '',
        enseignantId: coursItem.enseignantId || '',
      });
    } else {
      setEditingCours(null);
      setFormData({
        nom: '',
        ponderation: '',
        classeId: '',
        enseignantId: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCours(null);
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
      const submitData = {
        ...formData,
        ponderation: parseFloat(formData.ponderation) || 0
      };

      if (editingCours) {
        await coursAPI.update(editingCours.id, submitData);
        showSnackbar('Cours modifié avec succès', 'success');
      } else {
        await coursAPI.create(submitData);
        showSnackbar('Cours créé avec succès', 'success');
      }
      fetchCours();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      try {
        await coursAPI.delete(id);
        showSnackbar('Cours supprimé avec succès', 'success');
        fetchCours();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Cours
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un cours
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du cours</TableCell>
              <TableCell>Pondération</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell>Enseignant</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cours.map((coursItem) => (
              <TableRow key={coursItem.id}>
                <TableCell>{coursItem.nom}</TableCell>
                <TableCell>{coursItem.ponderation}</TableCell>
                <TableCell>{coursItem.nomClasse || '-'}</TableCell>
                <TableCell>{coursItem.nomEnseignant || '-'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(coursItem)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(coursItem.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingCours ? 'Modifier le cours' : 'Ajouter un cours'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              name="nom"
              label="Nom du cours"
              value={formData.nom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              placeholder="Ex: Mathématiques, Français, Histoire, etc."
            />
            <TextField
              name="ponderation"
              label="Pondération"
              type="number"
              value={formData.ponderation}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              inputProps={{ step: 0.1, min: 0 }}
              placeholder="Ex: 1, 1.5, 2, etc."
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Classe</InputLabel>
              <Select
                name="classeId"
                value={formData.classeId}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Aucune classe</em>
                </MenuItem>
                {classes.map((classe) => (
                  <MenuItem key={classe.id} value={classe.id}>
                    {classe.nomClasse} - {classe.anneeScolaire}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Enseignant</InputLabel>
              <Select
                name="enseignantId"
                value={formData.enseignantId}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Aucun enseignant</em>
                </MenuItem>
                {enseignants.map((enseignant) => (
                  <MenuItem key={enseignant.id} value={enseignant.id}>
                    {enseignant.nom} {enseignant.prenom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingCours ? 'Modifier' : 'Créer'}
          </Button>
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

export default CoursList;
