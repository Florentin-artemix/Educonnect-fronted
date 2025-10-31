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
  Card,
  CardContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assessment as AssessmentIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { detailBulletinAPI, bulletinAPI, coursAPI, noteAPI } from '../../services/api';

function DetailBulletinList() {
  const [detailsBulletin, setDetailsBulletin] = useState([]);
  const [bulletins, setBulletins] = useState([]);
  const [cours, setCours] = useState([]);
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [selectedBulletin, setSelectedBulletin] = useState('');
  const [formData, setFormData] = useState({
    bulletinId: '',
    coursId: '',
    noteId: '',
    noteObtenue: '',
    ponderation: '',
    moyennePonderee: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchDetailsBulletin();
    fetchBulletins();
    fetchCours();
    fetchNotes();
  }, []);

  const fetchDetailsBulletin = async () => {
    try {
      const response = await detailBulletinAPI.getAll();
      console.log('Détails bulletin récupérés:', response.data);
      setDetailsBulletin(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des détails bulletin:', error);
      showSnackbar('Erreur lors du chargement des détails bulletin', 'error');
    }
  };

  const fetchBulletins = async () => {
    try {
      const response = await bulletinAPI.getAll();
      setBulletins(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des bulletins:', error);
      showSnackbar('Erreur lors du chargement des bulletins', 'error');
    }
  };

  const fetchCours = async () => {
    try {
      const response = await coursAPI.getAll();
      console.log('Cours récupérés:', response.data);
      console.log('Structure du premier cours:', response.data?.[0]);
      setCours(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
      showSnackbar('Erreur lors du chargement des cours', 'error');
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await noteAPI.getAll();
      setNotes(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des notes:', error);
      showSnackbar('Erreur lors du chargement des notes', 'error');
    }
  };

  const handleOpen = (detail = null) => {
    if (detail) {
      setEditingDetail(detail);
      setFormData({
        bulletinId: detail.bulletinId || '',
        coursId: detail.coursId || '',
        noteId: detail.noteId || '',
        noteObtenue: detail.noteObtenue || '',
        ponderation: detail.ponderation || '',
        moyennePonderee: detail.moyennePonderee || '',
      });
    } else {
      setEditingDetail(null);
      setFormData({
        bulletinId: selectedBulletin || '',
        coursId: '',
        noteId: '',
        noteObtenue: '',
        ponderation: '',
        moyennePonderee: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDetail(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Calcul automatique de la moyenne pondérée
      if (name === 'noteObtenue' || name === 'ponderation') {
        const noteObtenue = parseFloat(name === 'noteObtenue' ? value : newData.noteObtenue);
        const ponderation = parseFloat(name === 'ponderation' ? value : newData.ponderation);
        
        if (!isNaN(noteObtenue) && !isNaN(ponderation) && ponderation > 0) {
          newData.moyennePonderee = (noteObtenue * ponderation / 20).toFixed(2);
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.bulletinId || !formData.coursId || !formData.noteObtenue || !formData.ponderation) {
        showSnackbar('Veuillez remplir tous les champs obligatoires', 'error');
        return;
      }

      const submitData = {
        bulletinId: parseInt(formData.bulletinId),
        coursId: parseInt(formData.coursId),
        noteId: formData.noteId ? parseInt(formData.noteId) : null,
        noteObtenue: parseFloat(formData.noteObtenue),
        ponderation: parseInt(formData.ponderation),
        moyennePonderee: formData.moyennePonderee ? parseFloat(formData.moyennePonderee) : null,
      };

      console.log('📤 Données détail bulletin à envoyer:', submitData);

      if (editingDetail) {
        const response = await detailBulletinAPI.update(editingDetail.id, submitData);
        console.log('✅ Réponse mise à jour:', response.data);
        showSnackbar('Détail bulletin modifié avec succès', 'success');
      } else {
        const response = await detailBulletinAPI.create(submitData);
        console.log('✅ Réponse création:', response.data);
        showSnackbar('Détail bulletin créé avec succès', 'success');
      }
      
      handleClose();
      fetchDetailsBulletin();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce détail bulletin ?')) {
      try {
        await detailBulletinAPI.delete(id);
        showSnackbar('Détail bulletin supprimé avec succès', 'success');
        fetchDetailsBulletin();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const getNoteColor = (note) => {
    if (!note) return 'default';
    if (note >= 16) return 'success';
    if (note >= 12) return 'primary';
    if (note >= 10) return 'warning';
    return 'error';
  };

  const getPonderationColor = (ponderation) => {
    if (!ponderation) return 'default';
    if (ponderation >= 4) return 'error';
    if (ponderation >= 3) return 'warning';
    if (ponderation >= 2) return 'primary';
    return 'success';
  };

  // Grouper les détails par bulletin
  const detailsGroupes = detailsBulletin.reduce((acc, detail) => {
    const bulletinId = detail.bulletinId;
    if (!acc[bulletinId]) {
      acc[bulletinId] = [];
    }
    acc[bulletinId].push(detail);
    return acc;
  }, {});

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Détails des Bulletins
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filtrer par bulletin</InputLabel>
            <Select
              value={selectedBulletin}
              onChange={(e) => setSelectedBulletin(e.target.value)}
              label="Filtrer par bulletin"
            >
              <MenuItem value="">Tous les bulletins</MenuItem>
              {bulletins.map((bulletin) => (
                <MenuItem key={bulletin.id} value={bulletin.id}>
                  {bulletin.eleveNom} {bulletin.elevePrenom} - {bulletin.periode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Ajouter un détail
          </Button>
        </Box>
      </Box>

      {/* Statistiques */}
      {detailsBulletin.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          📊 {detailsBulletin.length} détail(s) de bulletin • 
          {Object.keys(detailsGroupes).length} bulletin(s) avec détails
        </Alert>
      )}

      {/* Affichage groupé par bulletin */}
      {Object.keys(detailsGroupes).map((bulletinId) => {
        const bulletin = bulletins.find(b => b.id === parseInt(bulletinId));
        const details = detailsGroupes[bulletinId];
        
        if (selectedBulletin && selectedBulletin !== bulletinId) {
          return null;
        }

        return (
          <Card key={bulletinId} sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <SchoolIcon color="primary" />
                <Typography variant="h6">
                  {bulletin ? `${bulletin.nomEleve} ${bulletin.prenomEleve} - ${bulletin.periode}` : `Bulletin ${bulletinId}`}
                </Typography>
                {bulletin && bulletin.moyenneGenerale && (
                  <Chip
                    label={`Moyenne générale: ${bulletin.moyenneGenerale.toFixed(2)}/20`}
                    color={getNoteColor(bulletin.moyenneGenerale)}
                  />
                )}
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Matière</TableCell>
                      <TableCell>Note obtenue</TableCell>
                      <TableCell>Coefficient</TableCell>
                      <TableCell>Note pondérée</TableCell>
                      <TableCell>Note liée</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details.map((detail) => (
                      <TableRow key={detail.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <AssessmentIcon fontSize="small" color="action" />
                            {detail.nomCours || 'Cours non défini'}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {detail.noteObtenue ? (
                            <Chip
                              label={`${detail.noteObtenue}/20`}
                              color={getNoteColor(detail.noteObtenue)}
                              size="small"
                            />
                          ) : (
                            <Typography variant="caption" color="textSecondary">
                              Non définie
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {detail.ponderation ? (
                            <Chip
                              label={`Coeff ${detail.ponderation}`}
                              color={getPonderationColor(detail.ponderation)}
                              size="small"
                            />
                          ) : (
                            <Typography variant="caption" color="textSecondary">
                              Non défini
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {detail.moyennePonderee ? (
                            <Typography variant="body2" fontWeight="bold" color="primary">
                              {detail.moyennePonderee.toFixed(2)}
                            </Typography>
                          ) : (
                            <Typography variant="caption" color="textSecondary">
                              Non calculée
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {detail.noteId ? (
                            <Chip
                              label={`Note #${detail.noteId}`}
                              color="info"
                              size="small"
                            />
                          ) : (
                            <Typography variant="caption" color="textSecondary">
                              Aucune
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            onClick={() => handleOpen(detail)} 
                            color="primary"
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDelete(detail.id)} 
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      })}

      {detailsBulletin.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            Aucun détail de bulletin trouvé
          </Typography>
        </Paper>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingDetail ? 'Modifier le détail bulletin' : 'Créer un détail bulletin'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Bulletin</InputLabel>
              <Select
                name="bulletinId"
                value={formData.bulletinId}
                onChange={handleChange}
                label="Bulletin"
              >
                <MenuItem value="">
                  <em>Sélectionner un bulletin</em>
                </MenuItem>
                {bulletins.map((bulletin) => (
                  <MenuItem key={bulletin.id} value={bulletin.id}>
                    {bulletin.eleveNom} {bulletin.elevePrenom} - {bulletin.periode} - {bulletin.nomClasse}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Matière</InputLabel>
              <Select
                name="coursId"
                value={formData.coursId}
                onChange={handleChange}
                label="Matière"
              >
                <MenuItem value="">
                  <em>Sélectionner une matière</em>
                </MenuItem>
                {cours.map((cour) => (
                  <MenuItem key={cour.id} value={cour.id}>
                    {cour.nom} - {cour.nomClasse} ({cour.nomEnseignant})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Note associée</InputLabel>
              <Select
                name="noteId"
                value={formData.noteId}
                onChange={handleChange}
                label="Note associée"
              >
                <MenuItem value="">
                  <em>Aucune note liée</em>
                </MenuItem>
                {notes.map((note) => (
                  <MenuItem key={note.id} value={note.id}>
                    Note #{note.id} - {note.valeur}/20 ({note.eleveNom} {note.elevePrenom})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" gap={2}>
              <TextField
                name="noteObtenue"
                label="Note obtenue"
                type="number"
                inputProps={{ min: 0, max: 20, step: 0.01 }}
                value={formData.noteObtenue}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                helperText="Note de l'élève pour cette matière sur 20"
              />
              <TextField
                name="ponderation"
                label="Coefficient"
                type="number"
                inputProps={{ min: 1, step: 1 }}
                value={formData.ponderation}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                helperText="Coefficient de la matière"
              />
            </Box>

            <TextField
              name="moyennePonderee"
              label="Note pondérée (calculée automatiquement)"
              type="number"
              value={formData.moyennePonderee}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              helperText="Se calcule automatiquement : (note × coefficient) / 20"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingDetail ? 'Modifier' : 'Créer'}
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

export default DetailBulletinList;