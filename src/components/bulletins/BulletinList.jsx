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
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import { bulletinAPI, eleveAPI, classeAPI } from '../../services/api';

function BulletinList() {
  const [bulletins, setBulletins] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBulletin, setEditingBulletin] = useState(null);
  const [formData, setFormData] = useState({
    eleveId: '',
    classeId: '',
    periode: '',
    moyenneGenerale: '',
    pourcentageObtenu: '',
    rangClasse: '',
    nombreElevesClasse: '',
    appreciationGenerale: '',
    bulletinPdfPath: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const periodeOptions = [
    { value: 'Trimestre 1', label: 'Premier trimestre' },
    { value: 'Trimestre 2', label: 'Deuxième trimestre' },
    { value: 'Trimestre 3', label: 'Troisième trimestre' },
  ];

  useEffect(() => {
    fetchBulletins();
    fetchEleves();
    fetchClasses();
  }, []);

  const fetchBulletins = async () => {
    try {
      const response = await bulletinAPI.getAll();
      console.log('Bulletins récupérés:', response.data);
      setBulletins(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des bulletins:', error);
      showSnackbar('Erreur lors du chargement des bulletins', 'error');
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

  const fetchClasses = async () => {
    try {
      const response = await classeAPI.getAll();
      setClasses(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des classes:', error);
      showSnackbar('Erreur lors du chargement des classes', 'error');
    }
  };

  const handleOpen = (bulletin = null) => {
    if (bulletin) {
      setEditingBulletin(bulletin);
      setFormData({
        eleveId: bulletin.eleveId || '',
        classeId: bulletin.classeId || '',
        periode: bulletin.periode || '',
        moyenneGenerale: bulletin.moyenneGenerale || '',
        pourcentageObtenu: bulletin.pourcentageObtenu || '',
        rangClasse: bulletin.rangClasse || '',
        nombreElevesClasse: bulletin.nombreElevesClasse || '',
        appreciationGenerale: bulletin.appreciationGenerale || '',
        bulletinPdfPath: bulletin.bulletinPdfPath || '',
      });
    } else {
      setEditingBulletin(null);
      setFormData({
        eleveId: '',
        classeId: '',
        periode: '',
        moyenneGenerale: '',
        pourcentageObtenu: '',
        rangClasse: '',
        nombreElevesClasse: '',
        appreciationGenerale: '',
        bulletinPdfPath: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBulletin(null);
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
      if (!formData.eleveId || !formData.classeId || !formData.periode) {
        showSnackbar('Veuillez remplir les champs obligatoires', 'error');
        return;
      }

      const submitData = {
        eleveId: parseInt(formData.eleveId),
        classeId: parseInt(formData.classeId),
        periode: formData.periode,
        moyenneGenerale: formData.moyenneGenerale ? parseFloat(formData.moyenneGenerale) : null,
        pourcentageObtenu: formData.pourcentageObtenu ? parseFloat(formData.pourcentageObtenu) : null,
        rangClasse: formData.rangClasse ? parseInt(formData.rangClasse) : null,
        nombreElevesClasse: formData.nombreElevesClasse ? parseInt(formData.nombreElevesClasse) : null,
        appreciationGenerale: formData.appreciationGenerale || null,
        bulletinPdfPath: formData.bulletinPdfPath || null,
      };

      console.log('📤 Données bulletin à envoyer:', submitData);

      if (editingBulletin) {
        const response = await bulletinAPI.update(editingBulletin.id, submitData);
        console.log('✅ Réponse mise à jour:', response.data);
        showSnackbar('Bulletin modifié avec succès', 'success');
      } else {
        const response = await bulletinAPI.create(submitData);
        console.log('✅ Réponse création:', response.data);
        showSnackbar('Bulletin créé avec succès', 'success');
      }
      
      handleClose();
      fetchBulletins();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bulletin ?')) {
      try {
        await bulletinAPI.delete(id);
        showSnackbar('Bulletin supprimé avec succès', 'success');
        fetchBulletins();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const getPeriodeColor = (periode) => {
    switch (periode) {
      case 'Trimestre 1': return 'primary';
      case 'Trimestre 2': return 'secondary';
      case 'Trimestre 3': return 'success';
      default: return 'default';
    }
  };

  const getMoyenneColor = (moyenne) => {
    if (!moyenne) return 'default';
    if (moyenne >= 16) return 'success';
    if (moyenne >= 12) return 'primary';
    if (moyenne >= 10) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Bulletins
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Créer un bulletin
        </Button>
      </Box>

      {/* Statistiques */}
      {bulletins.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          📊 {bulletins.length} bulletin(s) généré(s)
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Élève</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell>Période</TableCell>
              <TableCell>Moyenne</TableCell>
              <TableCell>Rang</TableCell>
              <TableCell>Date génération</TableCell>
              <TableCell>PDF</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bulletins.map((bulletin) => (
              <TableRow key={bulletin.id}>
                <TableCell>
                  {bulletin.eleveNom} {bulletin.elevePrenom}
                </TableCell>
                <TableCell>{bulletin.nomClasse}</TableCell>
                <TableCell>
                  <Chip
                    label={bulletin.periode}
                    color={getPeriodeColor(bulletin.periode)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {bulletin.moyenneGenerale && (
                    <Chip
                      label={`${bulletin.moyenneGenerale.toFixed(2)}/20`}
                      color={getMoyenneColor(bulletin.moyenneGenerale)}
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {bulletin.rangClasse && bulletin.nombreElevesClasse ? (
                    `${bulletin.rangClasse}/${bulletin.nombreElevesClasse}`
                  ) : (
                    'Non calculé'
                  )}
                </TableCell>
                <TableCell>
                  {bulletin.dateGeneration ? 
                    new Date(bulletin.dateGeneration).toLocaleDateString('fr-FR') : 
                    'Non généré'
                  }
                </TableCell>
                <TableCell>
                  {bulletin.bulletinPdfPath ? (
                    <IconButton color="primary" title="Voir le PDF">
                      <PdfIcon />
                    </IconButton>
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      Non disponible
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(bulletin)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(bulletin.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {bulletins.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Aucun bulletin trouvé
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingBulletin ? 'Modifier le bulletin' : 'Créer un bulletin'}
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

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Classe</InputLabel>
              <Select
                name="classeId"
                value={formData.classeId}
                onChange={handleChange}
                label="Classe"
              >
                <MenuItem value="">
                  <em>Sélectionner une classe</em>
                </MenuItem>
                {classes.map((classe) => (
                  <MenuItem key={classe.id} value={classe.id}>
                    {classe.nomClasse} - {classe.anneeScolaire}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Période</InputLabel>
              <Select
                name="periode"
                value={formData.periode}
                onChange={handleChange}
                label="Période"
              >
                {periodeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" gap={2}>
              <TextField
                name="moyenneGenerale"
                label="Moyenne générale"
                type="number"
                inputProps={{ min: 0, max: 20, step: 0.01 }}
                value={formData.moyenneGenerale}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="pourcentageObtenu"
                label="Pourcentage obtenu (%)"
                type="number"
                inputProps={{ min: 0, max: 100, step: 0.01 }}
                value={formData.pourcentageObtenu}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                name="rangClasse"
                label="Rang dans la classe"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.rangClasse}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="nombreElevesClasse"
                label="Nombre total d'élèves"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.nombreElevesClasse}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Box>

            <TextField
              name="appreciationGenerale"
              label="Appréciation générale"
              multiline
              rows={3}
              value={formData.appreciationGenerale}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              name="bulletinPdfPath"
              label="Chemin du fichier PDF"
              value={formData.bulletinPdfPath}
              onChange={handleChange}
              fullWidth
              margin="normal"
              helperText="Chemin vers le fichier PDF généré (optionnel)"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingBulletin ? 'Modifier' : 'Créer'}
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

export default BulletinList;