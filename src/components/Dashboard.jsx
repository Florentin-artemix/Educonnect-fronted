import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Book as BookIcon,
} from '@mui/icons-material';
import { userAPI, eleveAPI, classeAPI, coursAPI } from '../services/api';

const StatCard = ({ title, value, icon, color, onClick }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h3" component="h2">
            {value}
          </Typography>
        </Box>
        <Box sx={{ color: color, fontSize: 40 }}>{icon}</Box>
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={onClick}>
        Voir plus
      </Button>
    </CardActions>
  </Card>
);

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    eleves: 0,
    classes: 0,
    cours: 0,
  });
  const [isBackendDown, setIsBackendDown] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, elevesRes, classesRes, coursRes] = await Promise.all([
          userAPI.getAll(),
          eleveAPI.getAll(),
          classeAPI.getAll(),
          coursAPI.getAll(),
        ]);

        setStats({
          users: usersRes.data.length,
          eleves: elevesRes.data.length,
          classes: classesRes.data.length,
          cours: coursRes.data.length,
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        setIsBackendDown(true);
        // Utiliser des données de test si le backend n'est pas disponible
        setStats({
          users: 5,
          eleves: 25,
          classes: 3,
          cours: 8,
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord
      </Typography>
      
      {isBackendDown && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>⚠️ Backend non disponible</AlertTitle>
          Le backend EduConnect n'est pas accessible sur http://localhost:8080. 
          Les données affichées sont des exemples. Pour utiliser l'application complètement :
          <br />
          <strong>1.</strong> Démarrez votre backend Spring Boot sur le port 8080
          <br />
          <strong>2.</strong> Vérifiez la configuration CORS
          <br />
          <strong>3.</strong> Rechargez cette page
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => window.open('/CORS_HELP.md', '_blank')}
              sx={{ mr: 1 }}
            >
              📖 Guide CORS
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => window.location.reload()}
            >
              🔄 Recharger
            </Button>
          </Box>
        </Alert>
      )}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(4, 1fr)' 
          },
          gap: 3 
        }}
      >
        <StatCard
          title="Utilisateurs"
          value={stats.users}
          icon={<PeopleIcon />}
          color="#1976d2"
          onClick={() => window.location.href = '/users'}
        />
        <StatCard
          title="Élèves"
          value={stats.eleves}
          icon={<SchoolIcon />}
          color="#2e7d32"
          onClick={() => window.location.href = '/eleves'}
        />
        <StatCard
          title="Classes"
          value={stats.classes}
          icon={<ClassIcon />}
          color="#ed6c02"
          onClick={() => window.location.href = '/classes'}
        />
        <StatCard
          title="Cours"
          value={stats.cours}
          icon={<BookIcon />}
          color="#9c27b0"
          onClick={() => window.location.href = '/cours'}
        />
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Actions Rapides
        </Typography>
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(4, 1fr)' 
            },
            gap: 2 
          }}
        >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Gestion des Utilisateurs
            </Typography>
            <Button variant="contained" fullWidth href="/users">
              Gérer les Utilisateurs
            </Button>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Gestion des Élèves
            </Typography>
            <Button variant="contained" fullWidth href="/eleves">
              Gérer les Élèves
            </Button>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Gestion des Classes
            </Typography>
            <Button variant="contained" fullWidth href="/classes">
              Gérer les Classes
            </Button>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Gestion des Notes
            </Typography>
            <Button variant="contained" fullWidth href="/notes">
              Gérer les Notes
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
