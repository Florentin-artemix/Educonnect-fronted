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
  LocationOn as LocationIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { adresseEleveAPI, eleveAPI } from '../../services/api';

function AdresseEleveList() {
  const [adresses, setAdresses] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingAdresse, setEditingAdresse] = useState(null);
  const [formData, setFormData] = useState({
    ville: '',
    communeTerritoire: '',
    ecole: '',
    code: '',
    eleveId: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchAdresses();
    fetchEleves();
  }, []);

  const fetchAdresses = async () => {
    try {
      const response = await adresseEleveAPI.getAll();
      console.log('Adresses récupérées:', response.data);
      console.log('Structure de la première adresse:', response.data?.[0]);
      setAdresses(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des adresses:', error);
      showSnackbar('Erreur lors du chargement des adresses', 'error');
    }
  };

  const fetchEleves = async () => {
    try {
      const response = await eleveAPI.getAll();
      setEleves(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des élèves:', error);
      showSnackbar('Erreur lors du chargement des élèves', 'error');
    }
  };

  const handleOpen = (adresse = null) => {
    if (adresse) {
      setEditingAdresse(adresse);
      setFormData({
        ville: adresse.ville || '',
        communeTerritoire: adresse.communeTerritoire || '',
        ecole: adresse.ecole || '',
        code: adresse.code || '',
        eleveId: adresse.eleveId || '',
      });
    } else {
      setEditingAdresse(null);
      setFormData({
        ville: '',
        communeTerritoire: '',
        ecole: '',
        code: '',
        eleveId: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAdresse(null);
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
      if (!formData.eleveId) {
        showSnackbar('Veuillez sélectionner un élève', 'error');
        return;
      }

      const submitData = {
        ville: formData.ville || null,
        communeTerritoire: formData.communeTerritoire || null,
        ecole: formData.ecole || null,
        code: formData.code || null,
        eleveId: parseInt(formData.eleveId),
      };

      console.log('📤 Données adresse à envoyer:', submitData);

      if (editingAdresse) {
        const response = await adresseEleveAPI.update(editingAdresse.id, submitData);
        console.log('✅ Réponse mise à jour:', response.data);
        showSnackbar('Adresse modifiée avec succès', 'success');
      } else {
        const response = await adresseEleveAPI.create(submitData);
        console.log('✅ Réponse création:', response.data);
        showSnackbar('Adresse créée avec succès', 'success');
      }
      
      handleClose();
      fetchAdresses();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
      try {
        await adresseEleveAPI.delete(id);
        showSnackbar('Adresse supprimée avec succès', 'success');
        fetchAdresses();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const formatAdresse = (adresse) => {
    const parts = [];
    if (adresse.ville) parts.push(adresse.ville);
    if (adresse.communeTerritoire) parts.push(adresse.communeTerritoire);
    if (adresse.code) parts.push(`(${adresse.code})`);
    return parts.join(', ') || 'Adresse incomplète';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Adresses des Élèves
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter une adresse
        </Button>
      </Box>

      {/* Statistiques */}
      {adresses.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          📍 {adresses.length} adresse(s) d'élève(s) enregistrée(s)
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Élève</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Commune/Territoire</TableCell>
              <TableCell>École</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Adresse complète</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adresses.map((adresse) => (
              <TableRow key={adresse.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <SchoolIcon fontSize="small" color="primary" />
                    <Typography variant="body2">
                      {adresse.nomEleve || 'Élève non défini'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {adresse.ville ? (
                    <Chip 
                      label={adresse.ville} 
                      color="primary" 
                      size="small"
                      icon={<LocationIcon />}
                    />
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      Non renseignée
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {adresse.communeTerritoire || (
                    <Typography variant="caption" color="textSecondary">
                      Non renseignée
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {adresse.ecole ? (
                    <Chip 
                      label={adresse.ecole} 
                      color="secondary" 
                      size="small"
                    />
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      Non renseignée
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {adresse.code ? (
                    <Chip 
                      label={adresse.code} 
                      variant="outlined" 
                      size="small"
                    />
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      Aucun
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {formatAdresse(adresse)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(adresse)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(adresse.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {adresses.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Aucune adresse d'élève trouvée
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingAdresse ? 'Modifier l\'adresse' : 'Ajouter une adresse d\'élève'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Élève</InputLabel>
              <Select
                name="eleveId"
                value={formData.eleveId}
                onChange={handleChange}
                label="Élève"
              >
                <MenuItem value="">
                  <em>Sélectionner un élève</em>
                </MenuItem>
                {eleves.map((eleve) => (
                  <MenuItem key={eleve.id} value={eleve.id}>
                    {eleve.nom} {eleve.prenom} - {eleve.nomClasse || 'Sans classe'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" gap={2}>
              <TextField
                name="ville"
                label="Ville"
                value={formData.ville}
                onChange={handleChange}
                fullWidth
                margin="normal"
                helperText="Ville de résidence de l'élève"
              />
              <TextField
                name="code"
                label="Code"
                value={formData.code}
                onChange={handleChange}
                fullWidth
                margin="normal"
                helperText="Code postal ou de référence"
              />
            </Box>

            <TextField
              name="communeTerritoire"
              label="Commune/Territoire"
              value={formData.communeTerritoire}
              onChange={handleChange}
              fullWidth
              margin="normal"
              helperText="Commune ou territoire administratif"
            />

            <TextField
              name="ecole"
              label="École"
              value={formData.ecole}
              onChange={handleChange}
              fullWidth
              margin="normal"
              helperText="Nom de l'établissement scolaire"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingAdresse ? 'Modifier' : 'Créer'}
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

export default AdresseEleveList;