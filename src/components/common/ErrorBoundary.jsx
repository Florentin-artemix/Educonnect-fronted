import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Divider,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const ErrorBoundary = ({ error, resetError, title = "Une erreur s'est produite" }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const isApiError = error?.message?.includes('Network Error') || 
                    error?.message?.includes('ERR_NETWORK') ||
                    error?.code === 'ERR_NETWORK';

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="400px"
      p={4}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 600, 
          textAlign: 'center',
          borderRadius: 2
        }}
      >
        <ErrorIcon 
          sx={{ 
            fontSize: 80, 
            color: 'error.main', 
            mb: 2 
          }} 
        />
        
        <Typography variant="h4" gutterBottom color="error">
          {title}
        </Typography>
        
        {isApiError ? (
          <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              🔌 Problème de connexion à l'API
            </Typography>
            <Typography variant="body2" paragraph>
              Le frontend n'arrive pas à se connecter au backend EduConnect.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Solutions possibles :</strong>
            </Typography>
            <ul style={{ marginLeft: '20px', textAlign: 'left' }}>
              <li>Vérifiez que le backend Spring Boot est démarré sur le port 8080</li>
              <li>Vérifiez l'URL de l'API dans le fichier .env</li>
              <li>Vérifiez la configuration CORS du backend</li>
              <li>Vérifiez votre connection Internet</li>
            </ul>
          </Alert>
        ) : (
          <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="body1" gutterBottom>
              <strong>Détails de l'erreur :</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
              {error?.message || 'Erreur inconnue'}
            </Typography>
          </Alert>
        )}

        <Divider sx={{ my: 3 }} />

        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            color="primary"
          >
            Recharger la page
          </Button>
          
          {resetError && (
            <Button
              variant="outlined"
              onClick={resetError}
              color="primary"
            >
              Réessayer
            </Button>
          )}
          
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={() => window.open('/GUIDE_DEMARRAGE.md', '_blank')}
            color="secondary"
          >
            Guide de dépannage
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'left', bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            🔧 Configuration requise :
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
            <li>Backend Spring Boot sur http://localhost:8080</li>
            <li>Endpoints /api/* accessibles</li>
            <li>CORS configuré pour localhost:5173</li>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

// Hook pour capturer les erreurs API
export const useErrorHandler = () => {
  const handleError = (error) => {
    console.error('Erreur capturée:', error);
    
    if (error.response) {
      // Erreur de réponse du serveur
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      switch (status) {
        case 404:
          return `Ressource non trouvée: ${message}`;
        case 400:
          return `Données invalides: ${message}`;
        case 401:
          return 'Non autorisé - Veuillez vous connecter';
        case 403:
          return 'Accès interdit - Permissions insuffisantes';
        case 500:
          return 'Erreur serveur interne';
        default:
          return `Erreur ${status}: ${message}`;
      }
    } else if (error.request) {
      // Erreur de réseau
      return 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
    } else {
      // Autre erreur
      return error.message || 'Une erreur inattendue s\'est produite';
    }
  };

  return { handleError };
};

export default ErrorBoundary;
