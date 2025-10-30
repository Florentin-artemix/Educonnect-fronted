// Mode développement avec données de test
// Activé automatiquement quand le backend n'est pas disponible

import { mockData } from '../data/mockData';

// Configuration de développement
export const DEV_CONFIG = {
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  BACKEND_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  SHOW_BACKEND_ALERTS: true,
};

// Service API avec fallback sur les données de test
export const createAPIWithFallback = (apiService, mockDataKey) => {
  const originalMethod = apiService.getAll;
  
  return {
    ...apiService,
    getAll: async () => {
      try {
        const result = await originalMethod();
        return result;
      } catch (error) {
        console.warn(`API ${mockDataKey} non disponible, utilisation des données de test`);
        return {
          data: mockData[mockDataKey] || []
        };
      }
    },
    
    getById: async (id) => {
      try {
        const result = await apiService.getById(id);
        return result;
      } catch (error) {
        console.warn(`API ${mockDataKey} non disponible, utilisation des données de test`);
        const item = mockData[mockDataKey]?.find(item => item.id === id);
        return item ? { data: item } : { data: null };
      }
    },
    
    create: async (data) => {
      try {
        return await apiService.create(data);
      } catch (error) {
        console.warn('Backend non disponible - Création simulée');
        const newId = Math.max(...mockData[mockDataKey].map(item => item.id), 0) + 1;
        const newItem = { ...data, id: newId };
        mockData[mockDataKey].push(newItem);
        return { data: newItem };
      }
    },
    
    update: async (id, data) => {
      try {
        return await apiService.update(id, data);
      } catch (error) {
        console.warn('Backend non disponible - Modification simulée');
        const index = mockData[mockDataKey].findIndex(item => item.id === id);
        if (index !== -1) {
          mockData[mockDataKey][index] = { ...mockData[mockDataKey][index], ...data };
          return { data: mockData[mockDataKey][index] };
        }
        throw new Error('Élément non trouvé');
      }
    },
    
    delete: async (id) => {
      try {
        return await apiService.delete(id);
      } catch (error) {
        console.warn('Backend non disponible - Suppression simulée');
        const index = mockData[mockDataKey].findIndex(item => item.id === id);
        if (index !== -1) {
          mockData[mockDataKey].splice(index, 1);
          return { data: null };
        }
        throw new Error('Élément non trouvé');
      }
    }
  };
};

// Messages d'aide pour l'utilisateur
export const BACKEND_HELP_MESSAGES = {
  CORS_ERROR: 'Erreur CORS - Vérifiez la configuration @CrossOrigin dans vos contrôleurs Spring Boot',
  NETWORK_ERROR: 'Impossible de contacter le backend - Vérifiez que Spring Boot fonctionne sur le port 8080',
  SERVER_ERROR: 'Erreur serveur - Vérifiez les logs de votre application Spring Boot',
  TIMEOUT_ERROR: 'Timeout - Le serveur met trop de temps à répondre'
};

// Utilitaire pour détecter le type d'erreur
export const getErrorType = (error) => {
  if (error.code === 'ERR_NETWORK') return 'NETWORK_ERROR';
  if (error.message?.includes('CORS')) return 'CORS_ERROR';
  if (error.code === 'ECONNABORTED') return 'TIMEOUT_ERROR';
  if (error.response?.status >= 500) return 'SERVER_ERROR';
  return 'UNKNOWN_ERROR';
};

// Configuration des endpoints Spring Boot
export const SPRING_BOOT_ENDPOINTS = {
  users: '/api/users',
  eleves: '/api/eleves', 
  classes: '/api/classes',
  cours: '/api/cours',
  notes: '/api/notes',
  paiements: '/api/paiements',
  communications: '/api/communications',
  roles: '/api/roles',
  bulletins: '/api/bulletins',
  parentEleves: '/api/parent-eleves',
  adresseEleves: '/api/adresse-eleves'
};

// Vérification de la santé du backend
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${DEV_CONFIG.BACKEND_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
