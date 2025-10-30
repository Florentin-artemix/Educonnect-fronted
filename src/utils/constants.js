// Constantes pour l'application EduConnect

export const API_BASE_URL = 'http://localhost:8080/api';

export const STATUT_PAIEMENT = {
  PAYE: 'PAYE',
  EN_ATTENTE: 'EN_ATTENTE',
  EN_RETARD: 'EN_RETARD'
};

export const TRIMESTRE = {
  TRIMESTRE_1: 'TRIMESTRE_1',
  TRIMESTRE_2: 'TRIMESTRE_2',
  TRIMESTRE_3: 'TRIMESTRE_3'
};

export const TYPE_COMMUNICATION = {
  INFORMATION: 'INFORMATION',
  ALERTE: 'ALERTE',
  RAPPEL: 'RAPPEL',
  CONVOCATION: 'CONVOCATION'
};

export const ROLES = {
  ADMIN: 'ADMIN',
  ENSEIGNANT: 'ENSEIGNANT',
  PARENT: 'PARENT',
  ELEVE: 'ELEVE'
};

// Utilitaires
export const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('fr-FR');
};

export const formatDateTime = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleString('fr-FR');
};

export const formatMoney = (amount) => {
  if (!amount) return '0,00 €';
  return `${amount.toLocaleString('fr-FR', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })} €`;
};

export const calculateAge = (birthDate) => {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const getStatusColor = (status, type = 'default') => {
  switch (type) {
    case 'paiement':
      switch (status) {
        case STATUT_PAIEMENT.PAYE: return 'success';
        case STATUT_PAIEMENT.EN_ATTENTE: return 'warning';
        case STATUT_PAIEMENT.EN_RETARD: return 'error';
        default: return 'default';
      }
    case 'communication':
      switch (status) {
        case TYPE_COMMUNICATION.INFORMATION: return 'info';
        case TYPE_COMMUNICATION.ALERTE: return 'error';
        case TYPE_COMMUNICATION.RAPPEL: return 'warning';
        case TYPE_COMMUNICATION.CONVOCATION: return 'success';
        default: return 'default';
      }
    default:
      return 'default';
  }
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '-';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return true; // Optionnel
  const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return re.test(phone);
};
