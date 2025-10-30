import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Button,
  CircularProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import UserApiTester from './common/UserApiTester';
import {
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Storage as DatabaseIcon,
  Api as ApiIcon,
} from '@mui/icons-material';

const StatusCheck = () => {
  const [status, setStatus] = useState({
    frontend: { status: 'ok', message: 'Frontend opérationnel' },
    backend: { status: 'checking', message: 'Vérification...' },
    cors: { status: 'checking', message: 'Vérification...' },
    endpoints: []
  });

  const endpoints = [
    { name: 'Utilisateurs', url: '/api/users' },
    { name: 'Élèves', url: '/api/eleves' },
    { name: 'Classes', url: '/api/classes' },
    { name: 'Cours', url: '/api/cours' },
    { name: 'Notes', url: '/api/notes' },
    { name: 'Paiements', url: '/api/paiements' },
    { name: 'Communications', url: '/api/communications' },
    { name: 'Rôles', url: '/api/roles' }
  ];

  const checkBackendHealth = async () => {
    const endpointResults = [];
    let backendStatus = 'ok';
    let corsStatus = 'ok';

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`http://localhost:8080${endpoint.url}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        endpointResults.push({
          ...endpoint,
          status: response.ok ? 'ok' : 'error',
          message: response.ok ? 'Accessible' : `Erreur ${response.status}`
        });
      } catch (error) {
        let errorStatus = 'error';
        let errorMessage = 'Erreur inconnue';

        if (error.message.includes('CORS')) {
          errorStatus = 'cors-error';
          errorMessage = 'Erreur CORS';
          corsStatus = 'error';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Backend indisponible';
          backendStatus = 'error';
        }

        endpointResults.push({
          ...endpoint,
          status: errorStatus,
          message: errorMessage
        });
      }
    }

    setStatus({
      frontend: { status: 'ok', message: 'Frontend opérationnel sur port 5173' },
      backend: { 
        status: backendStatus, 
        message: backendStatus === 'ok' ? 'Backend accessible sur port 8080' : 'Backend indisponible sur port 8080'
      },
      cors: {
        status: corsStatus,
        message: corsStatus === 'ok' ? 'CORS configuré correctement' : 'Configuration CORS manquante'
      },
      endpoints: endpointResults
    });
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ok': return <CheckIcon color="success" />;
      case 'error': 
      case 'cors-error': return <ErrorIcon color="error" />;
      case 'checking': return <CircularProgress size={20} />;
      default: return <WarningIcon color="warning" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ok': return 'success';
      case 'error':
      case 'cors-error': return 'error';
      case 'checking': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        🔍 Diagnostic du Système
      </Typography>

      {/* Test API Utilisateurs pour debug téléphone */}
      <UserApiTester />

      {/* État général */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          📊 État Général du Système
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              {getStatusIcon(status.frontend.status)}
            </ListItemIcon>
            <ListItemText 
              primary="Frontend React"
              secondary={status.frontend.message}
            />
            <Chip 
              label={status.frontend.status === 'ok' ? 'OK' : 'ERREUR'} 
              color={getStatusColor(status.frontend.status)}
              size="small"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {getStatusIcon(status.backend.status)}
            </ListItemIcon>
            <ListItemText 
              primary="Backend Spring Boot"
              secondary={status.backend.message}
            />
            <Chip 
              label={status.backend.status === 'ok' ? 'OK' : 'ERREUR'} 
              color={getStatusColor(status.backend.status)}
              size="small"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {getStatusIcon(status.cors.status)}
            </ListItemIcon>
            <ListItemText 
              primary="Configuration CORS"
              secondary={status.cors.message}
            />
            <Chip 
              label={status.cors.status === 'ok' ? 'OK' : 'ERREUR'} 
              color={getStatusColor(status.cors.status)}
              size="small"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Endpoints API */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          🔗 État des Endpoints API
        </Typography>
        
        <List>
          {status.endpoints.map((endpoint, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <ApiIcon />
              </ListItemIcon>
              <ListItemText 
                primary={endpoint.name}
                secondary={`http://localhost:8080${endpoint.url}`}
              />
              <Box display="flex" alignItems="center" gap={1}>
                {getStatusIcon(endpoint.status)}
                <Typography variant="body2" color="textSecondary">
                  {endpoint.message}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Solutions */}
      {(status.backend.status === 'error' || status.cors.status === 'error') && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🚨 Actions Requises
          </Typography>
          
          {status.backend.status === 'error' && (
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                1. Démarrer le Backend Spring Boot :
              </Typography>
              <Typography variant="body2" component="div" sx={{ ml: 2 }}>
                • Naviguez vers votre dossier Spring Boot<br />
                • Exécutez : <code>mvn spring-boot:run</code><br />
                • Vérifiez qu'il démarre sur le port 8080
              </Typography>
            </Box>
          )}

          {status.cors.status === 'error' && (
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                2. Configurer CORS :
              </Typography>
              <Typography variant="body2" component="div" sx={{ ml: 2 }}>
                • Ajoutez <code>@CrossOrigin(origins = "*")</code> à vos contrôleurs<br />
                • Ou copiez le fichier backend-config/CorsConfig.java<br />
                • Redémarrez Spring Boot après modification
              </Typography>
            </Box>
          )}

          <Box display="flex" gap={2} mt={2}>
            <Button 
              variant="outlined" 
              onClick={() => window.open('/CORS_HELP.md', '_blank')}
            >
              📖 Guide CORS Complet
            </Button>
            <Button 
              variant="outlined" 
              onClick={checkBackendHealth}
              startIcon={<RefreshIcon />}
            >
              🔄 Vérifier à Nouveau
            </Button>
          </Box>
        </Alert>
      )}

      {/* Succès */}
      {status.backend.status === 'ok' && status.cors.status === 'ok' && (
        <Alert severity="success">
          <Typography variant="h6" gutterBottom>
            🎉 Système Entièrement Opérationnel !
          </Typography>
          <Typography>
            Votre application EduConnect fonctionne parfaitement. Toutes les fonctionnalités CRUD sont disponibles.
          </Typography>
        </Alert>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Informations système */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          ℹ️ Informations Système
        </Typography>
        
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={2}>
          <Box>
            <Typography variant="subtitle2" color="primary">Frontend</Typography>
            <Typography variant="body2">React + Vite</Typography>
            <Typography variant="body2">Port: 5173</Typography>
            <Typography variant="body2">URL: http://localhost:5173</Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="primary">Backend</Typography>
            <Typography variant="body2">Spring Boot</Typography>
            <Typography variant="body2">Port: 8080</Typography>
            <Typography variant="body2">URL: http://localhost:8080</Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="primary">Base de Données</Typography>
            <Typography variant="body2">Configurée dans Spring Boot</Typography>
            <Typography variant="body2">Vérifiez application.properties</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatusCheck;
