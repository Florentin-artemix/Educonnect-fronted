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
} from '@mui/icons-material';
import { paiementAPI, eleveAPI } from '../../services/api';

function PaiementList() {
  const [paiements, setPaiements] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPaiement, setEditingPaiement] = useState(null);
  const [formData, setFormData] = useState({
    eleveId: '',
    montantTotal: '',
    montantPaye: '',
    trimestre: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const trimestreOptions = [
    { value: 'TRIMESTRE_1', label: 'Premier trimestre' },
    { value: 'TRIMESTRE_2', label: 'Deuxième trimestre' },
    { value: 'TRIMESTRE_3', label: 'Troisième trimestre' },
  ];

  useEffect(() => {
    fetchPaiements();
    fetchEleves();
  }, []);

  const fetchPaiements = async () => {
    try {
      const response = await paiementAPI.getAll();
      setPaiements(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des paiements:', error);
      showSnackbar('Erreur lors du chargement des paiements', 'error');
    }
  };

  const fetchEleves = async () => {
    try {
      const response = await eleveAPI.getAll();
      setEleves(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des élèves:', error);
    }
  };

  const handleOpen = (paiement = null) => {
    if (paiement) {
      setEditingPaiement(paiement);
      setFormData({
        eleveId: paiement.eleveId || '',
        montantTotal: paiement.montantTotal || '',
        montantPaye: paiement.montantPaye || '',
        trimestre: paiement.trimestre || '',
      });
    } else {
      setEditingPaiement(null);
      setFormData({
        eleveId: '',
        montantTotal: '',
        montantPaye: '',
        trimestre: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPaiement(null);
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
        montantTotal: parseFloat(formData.montantTotal) || 0,
        montantPaye: parseFloat(formData.montantPaye) || 0
      };

      if (editingPaiement) {
        await paiementAPI.update(editingPaiement.id, submitData);
        showSnackbar('Paiement modifié avec succès', 'success');
      } else {
        await paiementAPI.create(submitData);
        showSnackbar('Paiement créé avec succès', 'success');
      }
      fetchPaiements();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      try {
        await paiementAPI.delete(id);
        showSnackbar('Paiement supprimé avec succès', 'success');
        fetchPaiements();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getStatutColor = (montantTotal, montantPaye) => {
    if (!montantTotal || !montantPaye) return 'error';
    if (montantPaye >= montantTotal) return 'success';
    if (montantPaye > 0) return 'warning';
    return 'error';
  };

  const getStatutText = (montantTotal, montantPaye) => {
    if (!montantTotal || !montantPaye) return 'Non payé';
    if (montantPaye >= montantTotal) return 'Payé';
    if (montantPaye > 0) return 'Partiellement payé';
    return 'Non payé';
  };

  const getTrimestreText = (trimestre) => {
    const option = trimestreOptions.find(opt => opt.value === trimestre);
    return option ? option.label : trimestre;
  };

  const formatMontant = (montant) => {
    return montant ? `${montant.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : '0,00 €';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Paiements
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un paiement
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Élève</TableCell>
              <TableCell>Trimestre</TableCell>
              <TableCell>Montant total</TableCell>
              <TableCell>Montant payé</TableCell>
              <TableCell>Montant restant</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Date MAJ</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paiements.map((paiement) => (
              <TableRow key={paiement.id}>
                <TableCell>
                  {paiement.nomEleve && paiement.prenomEleve ? 
                    `${paiement.nomEleve} ${paiement.prenomEleve}` : '-'}
                </TableCell>
                <TableCell>{getTrimestreText(paiement.trimestre)}</TableCell>
                <TableCell>{formatMontant(paiement.montantTotal)}</TableCell>
                <TableCell>{formatMontant(paiement.montantPaye)}</TableCell>
                <TableCell>{formatMontant(paiement.montantRestant)}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatutText(paiement.montantTotal, paiement.montantPaye)}
                    color={getStatutColor(paiement.montantTotal, paiement.montantPaye)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {paiement.dateMaj ? new Date(paiement.dateMaj).toLocaleDateString('fr-FR') : '-'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(paiement)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(paiement.id)} color="error">
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
          {editingPaiement ? 'Modifier le paiement' : 'Ajouter un paiement'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Élève</InputLabel>
              <Select
                name="eleveId"
                value={formData.eleveId}
                onChange={handleChange}
              >
                {eleves.map((eleve) => (
                  <MenuItem key={eleve.id} value={eleve.id}>
                    {eleve.nom} {eleve.prenom} - {eleve.nomClasse || 'Aucune classe'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Trimestre</InputLabel>
              <Select
                name="trimestre"
                value={formData.trimestre}
                onChange={handleChange}
              >
                {trimestreOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="montantTotal"
              label="Montant total (€)"
              type="number"
              value={formData.montantTotal}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              inputProps={{ step: 0.01, min: 0 }}
            />
            <TextField
              name="montantPaye"
              label="Montant payé (€)"
              type="number"
              value={formData.montantPaye}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              inputProps={{ step: 0.01, min: 0 }}
            />
            {formData.montantTotal && formData.montantPaye && (
              <Box mt={2}>
                <Typography variant="body1">
                  Montant restant: <strong>
                    {formatMontant(parseFloat(formData.montantTotal) - parseFloat(formData.montantPaye))}
                  </strong>
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingPaiement ? 'Modifier' : 'Créer'}
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

export default PaiementList;
