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
import { classeAPI, userAPI } from '../../services/api';

function ClasseList() {
  const [classes, setClasses] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingClasse, setEditingClasse] = useState(null);
  const [formData, setFormData] = useState({
    nomClasse: '',
    anneeScolaire: '',
    enseignantId: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchClasses();
    fetchEnseignants();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classeAPI.getAll();
      setClasses(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des classes:', error);
      showSnackbar('Erreur lors du chargement des classes', 'error');
    }
  };

  const fetchEnseignants = async () => {
    try {
      const response = await userAPI.getAll();
      // Filtrer les utilisateurs qui ont le rôle d'enseignant
      const enseignantsFiltered = response.data.filter(user => 
        user.roles && (user.roles.includes('ENSEIGNANT') || user.roles.includes('ADMIN'))
      );
      setEnseignants(enseignantsFiltered);
    } catch (error) {
      console.error('Erreur lors du chargement des enseignants:', error);
    }
  };

  const handleOpen = (classe = null) => {
    if (classe) {
      setEditingClasse(classe);
      setFormData({
        nomClasse: classe.nomClasse || '',
        anneeScolaire: classe.anneeScolaire || '',
        enseignantId: classe.enseignantId || '',
      });
    } else {
      setEditingClasse(null);
      setFormData({
        nomClasse: '',
        anneeScolaire: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
        enseignantId: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingClasse(null);
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
      if (editingClasse) {
        await classeAPI.update(editingClasse.id, formData);
        showSnackbar('Classe modifiée avec succès', 'success');
      } else {
        await classeAPI.create(formData);
        showSnackbar('Classe créée avec succès', 'success');
      }
      fetchClasses();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette classe ?')) {
      try {
        await classeAPI.delete(id);
        showSnackbar('Classe supprimée avec succès', 'success');
        fetchClasses();
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
          Gestion des Classes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter une classe
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de la classe</TableCell>
              <TableCell>Année scolaire</TableCell>
              <TableCell>Enseignant</TableCell>
              <TableCell>Nombre d'élèves</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classe) => (
              <TableRow key={classe.id}>
                <TableCell>{classe.nomClasse}</TableCell>
                <TableCell>{classe.anneeScolaire}</TableCell>
                <TableCell>{classe.nomEnseignant || '-'}</TableCell>
                <TableCell>{classe.nombreEleves || 0}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(classe)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(classe.id)} color="error">
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
          {editingClasse ? 'Modifier la classe' : 'Ajouter une classe'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              name="nomClasse"
              label="Nom de la classe"
              value={formData.nomClasse}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              placeholder="Ex: CM1-A, 6ème-B, etc."
            />
            <TextField
              name="anneeScolaire"
              label="Année scolaire"
              value={formData.anneeScolaire}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              placeholder="Ex: 2023-2024"
            />
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
            {editingClasse ? 'Modifier' : 'Créer'}
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

export default ClasseList;
