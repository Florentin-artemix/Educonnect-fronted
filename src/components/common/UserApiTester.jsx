import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, Paper } from '@mui/material';
import { userAPI } from '../../services/api';

function UserApiTester() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testUsersAPI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Test de l\'API utilisateurs...');
      const response = await userAPI.getAll();
      console.log('✅ Réponse API utilisateurs:', response);
      console.log('📋 Données utilisateurs:', response.data);
      
      if (response.data && response.data.length > 0) {
        console.log('🔍 Structure du premier utilisateur:', Object.keys(response.data[0]));
        console.log('📞 Champs téléphone possibles:', {
          telephone: response.data[0].telephone,
          phone: response.data[0].phone,
          numTelephone: response.data[0].numTelephone,
          numeroTelephone: response.data[0].numeroTelephone,
          tel: response.data[0].tel
        });
      }
      
      setUsers(response.data || []);
    } catch (err) {
      console.error('❌ Erreur API utilisateurs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testUsersAPI();
  }, []);

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        🔧 Test API Utilisateurs - Debug Téléphone
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testUsersAPI}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? 'Test en cours...' : 'Tester l\'API Utilisateurs'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <strong>Erreur API:</strong> {error}
        </Alert>
      )}

      {users.length > 0 && (
        <>
          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>✅ {users.length} utilisateur(s) trouvé(s)</strong>
          </Alert>
          
          {users.map((user, index) => (
            <Alert severity="info" key={index} sx={{ mb: 1 }}>
              <Typography variant="subtitle2">
                Utilisateur {index + 1}: {user.nom} {user.prenom}
              </Typography>
              <Typography variant="body2">
                Email: {user.email}
              </Typography>
              <Typography variant="body2">
                <strong>Téléphone (telephone):</strong> {user.telephone || 'Non défini'} |
                <strong> (phone):</strong> {user.phone || 'Non défini'} |
                <strong> (numTelephone):</strong> {user.numTelephone || 'Non défini'}
              </Typography>
              <Typography variant="caption">
                Toutes les propriétés: {Object.keys(user).join(', ')}
              </Typography>
            </Alert>
          ))}
        </>
      )}

      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
        Données brutes complètes:
      </Typography>
      <Box component="pre" sx={{ fontSize: '0.7rem', backgroundColor: '#f5f5f5', p: 1, borderRadius: 1, maxHeight: '300px', overflow: 'auto' }}>
        {JSON.stringify(users, null, 2)}
      </Box>
    </Paper>
  );
}

export default UserApiTester;