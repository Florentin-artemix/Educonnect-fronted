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
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { userAPI, roleAPI } from '../../services/api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    motDePasse: '',
    role: ''  // Changé: un seul rôle au lieu d'un tableau
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Chargement des utilisateurs...');
      const response = await userAPI.getAll();
      console.log('Utilisateurs récupérés:', response.data);
      
      // Vérifier la structure des données utilisateur
      if (response.data && response.data.length > 0) {
        console.log('Structure du premier utilisateur:', response.data[0]);
      }
      
      setUsers(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      showSnackbar('Erreur lors du chargement des utilisateurs', 'error');
      // Mode développement avec données de test incluant téléphone
      setUsers([
        {
          id: 1,
          nom: 'Admin',
          prenom: 'Système',
          email: 'admin@educonnect.com',
          telephone: '0123456789',
          adresse: '123 Rue de Test',
          roles: ['ADMIN']
        }
      ]);
    }
  };

  const fetchRoles = async () => {
    try {
      console.log('Chargement des rôles...');
      const response = await roleAPI.getAll();
      console.log('Rôles récupérés:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setRoles(response.data);
        console.log('Rôles configurés:', response.data);
      } else {
        console.warn('Structure de rôles inattendue:', response.data);
        setRoles([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des rôles:', error);
      showSnackbar('Erreur lors du chargement des rôles', 'error');
      setRoles([]);
    }
  };

  const handleOpen = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        telephone: user.numeroTelephone || '',
        adresse: user.adresse || '',
        motDePasse: '',
        role: user.roles && user.roles.length > 0 ? user.roles[0] : ''  // Prendre le premier rôle seulement
      });
    } else {
      setEditingUser(null);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        motDePasse: '',
        role: ''  // Un seul rôle vide
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    console.log('Sélection de rôle:', value);
    setFormData(prev => ({
      ...prev,
      role: value  // Un seul rôle sélectionné
    }));
  };

  const handleSubmit = async () => {
    try {
      let submitData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        numeroTelephone: formData.telephone,
        adresse: formData.adresse,
        roles: formData.role && formData.role.trim() !== '' ? [formData.role] : []
      };

      // Validation : s'assurer qu'un rôle est sélectionné
      if (!formData.role || formData.role.trim() === '') {
        showSnackbar('Veuillez sélectionner un rôle', 'error');
        return;
      }

      // N'ajouter le mot de passe QUE lors de la création ou s'il n'est pas vide
      if (!editingUser) {
        // Création : mot de passe obligatoire
        submitData.motDePasse = formData.motDePasse;
      } else if (formData.motDePasse && formData.motDePasse.trim() !== '') {
        // Modification : mot de passe seulement s'il est rempli
        submitData.motDePasse = formData.motDePasse;
      }

      console.log('📤 Données à envoyer:', submitData);
      console.log('🏷️ Rôle sélectionné dans le form:', formData.role);
      console.log('📋 Array de rôles envoyé:', submitData.roles);

      if (editingUser) {
        const response = await userAPI.update(editingUser.id, submitData);
        console.log('✅ Réponse mise à jour:', response.data);
        showSnackbar('Utilisateur modifié avec succès', 'success');
      } else {
        const response = await userAPI.create(submitData);
        console.log('✅ Réponse création:', response.data);
        showSnackbar('Utilisateur créé avec succès', 'success');
      }
      
      handleClose();
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await userAPI.delete(id);
        showSnackbar('Utilisateur supprimé avec succès', 'success');
        fetchUsers();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showSnackbar('Erreur lors de la suppression', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const getRoleColor = (role) => {
    const colors = {
      'ADMIN': 'error',
      'ENSEIGNANT': 'primary',
      'PARENT': 'secondary',
      'PERCEPTEUR': 'warning',
      'ELEVE': 'success'
    };
    return colors[role] || 'default';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des Utilisateurs
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un utilisateur
        </Button>
      </Box>

      {/* Debug des rôles */}
      {roles.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          ✅ {roles.length} rôle(s) chargé(s) : {roles.map(r => r.nomRole).join(', ')}
        </Alert>
      )}



      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Rôles</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nom}</TableCell>
                <TableCell>{user.prenom}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.numeroTelephone || 'Non renseigné'}
                </TableCell>
                <TableCell>
                  {user.roles && user.roles.map((role, index) => (
                    <Chip
                      key={index}
                      label={role}
                      color={getRoleColor(role)}
                      size="small"
                      sx={{ mr: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="error">
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
          {editingUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
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
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="telephone"
              label="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="adresse"
              label="Adresse"
              value={formData.adresse}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            {!editingUser && (
              <TextField
                name="motDePasse"
                label="Mot de passe"
                type="password"
                value={formData.motDePasse}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            )}
            
            {/* Menu déroulant pour UN SEUL rôle */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label">Rôle</InputLabel>
              <Select
                labelId="role-label"
                value={formData.role}
                onChange={handleRoleChange}
                label="Rôle"
              >
                <MenuItem value="">
                  <em>Sélectionner un rôle</em>
                </MenuItem>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <MenuItem key={role.id} value={role.nomRole}>
                      {role.nomRole}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    <em>Aucun rôle disponible</em>
                  </MenuItem>
                )}
              </Select>
              <FormHelperText>
                {roles.length === 0 ? 
                  "Chargement des rôles..." : 
                  "Sélectionnez un rôle pour cet utilisateur"
                }
              </FormHelperText>
            </FormControl>

            {/* Debug du formulaire */}
            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Rôle sélectionné:</strong> {formData.role || 'Aucun'}
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingUser ? 'Modifier' : 'Créer'}
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

export default UserList;
