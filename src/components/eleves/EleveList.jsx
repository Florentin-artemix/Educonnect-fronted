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
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { eleveAPI, classeAPI } from '../../services/api';

function EleveList() {
  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);
  const [statutsDisponibles, setStatutsDisponibles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEleve, setEditingEleve] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: null,
    lieuNaissance: '',
    numeroPermanent: '',
    statutPaiement: 'NON_EN_ORDRE',
    classeId: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const statutPaiementOptions = [
    { value: 'DEROGATION', label: 'Dérogation' },
    { value: 'NON_EN_ORDRE', label: 'Non en ordre' },
    { value: 'EN_ORDRE', label: 'En ordre' },
  ];

  useEffect(() => {
    fetchEleves();
    fetchClasses();
    fetchStatutsPaiement();
  }, []);

  const fetchEleves = async () => {
    try {
      const response = await eleveAPI.getAll();
      setEleves(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des élèves:', error);
      showSnackbar('Erreur lors du chargement des élèves', 'error');
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

  const fetchStatutsPaiement = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/eleves/statuts-paiement');
      const statuts = await response.json();
      console.log('✅ Statuts récupérés depuis le backend:', statuts);
      
      // Convertir en format attendu par le composant
      const statutsFormatted = statuts.map(statut => ({
        value: statut,
        label: getStatutLabel(statut)
      }));
      
      setStatutsDisponibles(statutsFormatted);
    } catch (error) {
      console.error('Erreur lors du chargement des statuts:', error);
      // Fallback sur les valeurs par défaut
      setStatutsDisponibles(statutPaiementOptions);
      showSnackbar('Utilisation des statuts par défaut', 'warning');
    }
  };

  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'DEROGATION': return 'Dérogation';
      case 'NON_EN_ORDRE': return 'Non en ordre';
      case 'EN_ORDRE': return 'En ordre';
      default: return statut;
    }
  };

  const handleOpen = (eleve = null) => {
    if (eleve) {
      setEditingEleve(eleve);
      setFormData({
        nom: eleve.nom || '',
        prenom: eleve.prenom || '',
        dateNaissance: eleve.dateNaissance ? dayjs(eleve.dateNaissance) : null,
        lieuNaissance: eleve.lieuNaissance || '',
        numeroPermanent: eleve.numeroPermanent || '',
        statutPaiement: eleve.statutPaiement || 'NON_EN_ORDRE',
        classeId: eleve.classeId || '',
      });
    } else {
      setEditingEleve(null);
      setFormData({
        nom: '',
        prenom: '',
        dateNaissance: null,
        lieuNaissance: '',
        numeroPermanent: '',
        statutPaiement: 'NON_EN_ORDRE',
        classeId: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEleve(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dateNaissance: date
    }));
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        dateNaissance: formData.dateNaissance ? formData.dateNaissance.format('YYYY-MM-DD') : null,
      };

      if (editingEleve) {
        await eleveAPI.update(editingEleve.id, submitData);
        showSnackbar('Élève modifié avec succès', 'success');
      } else {
        await eleveAPI.create(submitData);
        showSnackbar('Élève créé avec succès', 'success');
      }
      fetchEleves();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      try {
        await eleveAPI.delete(id);
        showSnackbar('Élève supprimé avec succès', 'success');
        fetchEleves();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'EN_ORDRE': return 'success';
      case 'NON_EN_ORDRE': return 'error';
      case 'DEROGATION': return 'warning';
      default: return 'default';
    }
  };

  const getStatutText = (statut) => {
    // Utiliser les statuts du backend si disponibles, sinon fallback
    const options = statutsDisponibles.length > 0 ? statutsDisponibles : statutPaiementOptions;
    const option = options.find(opt => opt.value === statut);
    return option ? option.label : statut;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Élèves
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un élève
        </Button>
      </Box>

      {/* Debug des statuts récupérés */}
      {statutsDisponibles.length > 0 && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ✅ Statuts récupérés du backend : {statutsDisponibles.map(s => s.label).join(', ')}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Date de naissance</TableCell>
              <TableCell>Lieu de naissance</TableCell>
              <TableCell>N° Permanent</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell>Statut paiement</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eleves.map((eleve) => (
              <TableRow key={eleve.id}>
                <TableCell>{eleve.nom}</TableCell>
                <TableCell>{eleve.prenom}</TableCell>
                <TableCell>
                  {eleve.dateNaissance ? new Date(eleve.dateNaissance).toLocaleDateString('fr-FR') : '-'}
                </TableCell>
                <TableCell>{eleve.lieuNaissance || '-'}</TableCell>
                <TableCell>{eleve.numeroPermanent || '-'}</TableCell>
                <TableCell>{eleve.nomClasse || '-'}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatutText(eleve.statutPaiement)} 
                    color={getStatutColor(eleve.statutPaiement)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(eleve)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(eleve.id)} color="error">
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
          {editingEleve ? 'Modifier l\'élève' : 'Ajouter un élève'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              name="nom"
              label="Nom"
              value={formData.nom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="prenom"
              label="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <DatePicker
              label="Date de naissance"
              value={formData.dateNaissance}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
              sx={{ width: '100%', mt: 2, mb: 1 }}
            />
            <TextField
              name="lieuNaissance"
              label="Lieu de naissance"
              value={formData.lieuNaissance}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="numeroPermanent"
              label="Numéro permanent"
              value={formData.numeroPermanent}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
              <InputLabel>Statut de paiement</InputLabel>
              <Select
                name="statutPaiement"
                value={formData.statutPaiement}
                onChange={handleChange}
              >
                {(statutsDisponibles.length > 0 ? statutsDisponibles : statutPaiementOptions).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingEleve ? 'Modifier' : 'Créer'}
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

export default EleveList;
