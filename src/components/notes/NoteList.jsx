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
import { noteAPI, eleveAPI, coursAPI } from '../../services/api';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [cours, setCours] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({
    eleveId: '',
    coursId: '',
    periode: '',
    pointObtenu: '',
    ponderation: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const periodeOptions = [
    { value: 'TRIMESTRE_1', label: 'Premier trimestre' },
    { value: 'TRIMESTRE_2', label: 'Deuxième trimestre' },
    { value: 'TRIMESTRE_3', label: 'Troisième trimestre' },
    { value: 'SEMESTRE_1', label: 'Premier semestre' },
    { value: 'SEMESTRE_2', label: 'Deuxième semestre' },
  ];

  useEffect(() => {
    fetchNotes();
    fetchEleves();
    fetchCours();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await noteAPI.getAll();
      setNotes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des notes:', error);
      showSnackbar('Erreur lors du chargement des notes', 'error');
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

  const fetchCours = async () => {
    try {
      const response = await coursAPI.getAll();
      setCours(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
    }
  };

  const handleOpen = (note = null) => {
    if (note) {
      setEditingNote(note);
      setFormData({
        eleveId: note.eleveId || '',
        coursId: note.coursId || '',
        periode: note.periode || '',
        pointObtenu: note.pointObtenu || '',
        ponderation: note.ponderation || '',
      });
    } else {
      setEditingNote(null);
      setFormData({
        eleveId: '',
        coursId: '',
        periode: '',
        pointObtenu: '',
        ponderation: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingNote(null);
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
        pointObtenu: parseFloat(formData.pointObtenu) || 0,
        ponderation: parseFloat(formData.ponderation) || 0
      };

      if (editingNote) {
        await noteAPI.update(editingNote.id, submitData);
        showSnackbar('Note modifiée avec succès', 'success');
      } else {
        await noteAPI.create(submitData);
        showSnackbar('Note créée avec succès', 'success');
      }
      fetchNotes();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      try {
        await noteAPI.delete(id);
        showSnackbar('Note supprimée avec succès', 'success');
        fetchNotes();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const calculateMoyenne = (pointObtenu, ponderation) => {
    if (!ponderation || ponderation === 0) return 'N/A';
    return (pointObtenu / ponderation * 20).toFixed(2);
  };

  const getMoyenneColor = (moyenne) => {
    if (moyenne === 'N/A') return 'default';
    const num = parseFloat(moyenne);
    if (num >= 16) return 'success';
    if (num >= 12) return 'primary';
    if (num >= 10) return 'warning';
    return 'error';
  };

  const getPeriodeText = (periode) => {
    const option = periodeOptions.find(opt => opt.value === periode);
    return option ? option.label : periode;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Notes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter une note
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Élève</TableCell>
              <TableCell>Cours</TableCell>
              <TableCell>Période</TableCell>
              <TableCell>Points obtenus</TableCell>
              <TableCell>Pondération</TableCell>
              <TableCell>Moyenne /20</TableCell>
              <TableCell>Date saisie</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => {
              const moyenne = calculateMoyenne(note.pointObtenu, note.ponderation);
              return (
                <TableRow key={note.id}>
                  <TableCell>
                    {note.nomEleve && note.prenomEleve ? 
                      `${note.nomEleve} ${note.prenomEleve}` : '-'}
                  </TableCell>
                  <TableCell>{note.nomCours || '-'}</TableCell>
                  <TableCell>{getPeriodeText(note.periode)}</TableCell>
                  <TableCell>{note.pointObtenu}</TableCell>
                  <TableCell>{note.ponderation}</TableCell>
                  <TableCell>
                    <Chip 
                      label={moyenne}
                      color={getMoyenneColor(moyenne)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {note.dateSaisie ? new Date(note.dateSaisie).toLocaleDateString('fr-FR') : '-'}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(note)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(note.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingNote ? 'Modifier la note' : 'Ajouter une note'}
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
              <InputLabel>Cours</InputLabel>
              <Select
                name="coursId"
                value={formData.coursId}
                onChange={handleChange}
              >
                {cours.map((coursItem) => (
                  <MenuItem key={coursItem.id} value={coursItem.id}>
                    {coursItem.nom} - {coursItem.nomClasse || 'Aucune classe'}
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
              >
                {periodeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="pointObtenu"
              label="Points obtenus"
              type="number"
              value={formData.pointObtenu}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              inputProps={{ step: 0.1, min: 0 }}
            />
            <TextField
              name="ponderation"
              label="Pondération (points maximum)"
              type="number"
              value={formData.ponderation}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              inputProps={{ step: 0.1, min: 0.1 }}
            />
            {formData.pointObtenu && formData.ponderation && (
              <Box mt={2}>
                <Typography variant="body1">
                  Moyenne calculée: <strong>{calculateMoyenne(formData.pointObtenu, formData.ponderation)}/20</strong>
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingNote ? 'Modifier' : 'Créer'}
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

export default NoteList;
