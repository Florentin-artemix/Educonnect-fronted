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
import { parentEleveAPI, userAPI, eleveAPI } from '../../services/api';

function ParentEleveList() {
  const [parentsEleves, setParentsEleves] = useState([]);
  const [users, setUsers] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingRelation, setEditingRelation] = useState(null);
  const [formData, setFormData] = useState({
    parentId: '',
    eleveId: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchParentsEleves();
    fetchUsers();
    fetchEleves();
  }, []);

  const fetchParentsEleves = async () => {
    try {
      const response = await parentEleveAPI.getAll();
      console.log('Relations Parent-Élève récupérées:', response.data);
      console.log('Structure de la première relation:', response.data?.[0]);
      setParentsEleves(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des relations:', error);
      showSnackbar('Erreur lors du chargement des relations Parent-Élève', 'error');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      // Filtrer seulement les parents
      const parents = response.data?.filter(user => 
        user.roles && user.roles.includes('PARENT')
      ) || [];
      setUsers(parents);
    } catch (error) {
      console.error('Erreur lors du chargement des parents:', error);
      showSnackbar('Erreur lors du chargement des parents', 'error');
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

  const handleOpen = (relation = null) => {
    if (relation) {
      setEditingRelation(relation);
      setFormData({
        parentId: relation.parentId || '',
        eleveId: relation.eleveId || '',
      });
    } else {
      setEditingRelation(null);
      setFormData({
        parentId: '',
        eleveId: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRelation(null);
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
      if (!formData.parentId || !formData.eleveId) {
        showSnackbar('Veuillez sélectionner un parent et un élève', 'error');
        return;
      }

      const submitData = {
        parentId: parseInt(formData.parentId),
        eleveId: parseInt(formData.eleveId)
      };

      console.log('📤 Données à envoyer:', submitData);

      if (editingRelation) {
        const response = await parentEleveAPI.update(editingRelation.id, submitData);
        console.log('✅ Réponse mise à jour:', response.data);
        showSnackbar('Relation Parent-Élève modifiée avec succès', 'success');
      } else {
        const response = await parentEleveAPI.create(submitData);
        console.log('✅ Réponse création:', response.data);
        showSnackbar('Relation Parent-Élève créée avec succès', 'success');
      }
      
      handleClose();
      fetchParentsEleves();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette relation ?')) {
      try {
        await parentEleveAPI.delete(id);
        showSnackbar('Relation supprimée avec succès', 'success');
        fetchParentsEleves();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Relations Parent-Élève
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter une relation
        </Button>
      </Box>

      {/* Info sur le nombre de relations */}
      {parentsEleves.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          📊 {parentsEleves.length} relation(s) Parent-Élève enregistrée(s)
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parent</TableCell>
              <TableCell>Email Parent</TableCell>
              <TableCell>Élève</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parentsEleves.map((relation) => (
              <TableRow key={relation.id}>
                <TableCell>
                  {relation.nomParent} {relation.prenomParent}
                </TableCell>
                <TableCell>{relation.emailParent}</TableCell>
                <TableCell>
                  {relation.nomEleve} {relation.prenomEleve}
                </TableCell>
                <TableCell>
                  <Chip 
                    label="Actif" 
                    color="success" 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(relation)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(relation.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {parentsEleves.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Aucune relation Parent-Élève trouvée
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRelation ? 'Modifier la relation' : 'Ajouter une relation Parent-Élève'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Parent</InputLabel>
              <Select
                name="parentId"
                value={formData.parentId}
                onChange={handleChange}
                label="Parent"
              >
                <MenuItem value="">
                  <em>Sélectionner un parent</em>
                </MenuItem>
                {users.map((parent) => (
                  <MenuItem key={parent.id} value={parent.id}>
                    {parent.nom} {parent.prenom} - {parent.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

            {/* Debug du formulaire */}
            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Parent sélectionné:</strong> {formData.parentId || 'Aucun'}<br />
              <strong>Élève sélectionné:</strong> {formData.eleveId || 'Aucun'}
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingRelation ? 'Modifier' : 'Créer'}
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

export default ParentEleveList;