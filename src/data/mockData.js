// Données de test pour le développement local
// À utiliser si le backend n'est pas disponible

export const mockData = {
  users: [
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@example.com",
      numeroTelephone: "0123456789",
      adresse: "123 Rue de la Paix, Paris",
      roles: ["ADMIN"],
      dateCreation: "2024-01-15T10:30:00"
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Marie",
      email: "marie.martin@example.com",
      numeroTelephone: "0987654321",
      adresse: "456 Avenue des Champs, Lyon",
      roles: ["ENSEIGNANT"],
      dateCreation: "2024-02-20T14:15:00"
    }
  ],
  
  eleves: [
    {
      id: 1,
      nom: "Durant",
      prenom: "Pierre",
      dateNaissance: "2010-05-15",
      lieuNaissance: "Paris",
      numeroPermanent: "2010051501",
      statutPaiement: "PAYE",
      classeId: 1,
      nomClasse: "CM1-A"
    },
    {
      id: 2,
      nom: "Leclerc",
      prenom: "Sophie",
      dateNaissance: "2009-08-22",
      lieuNaissance: "Lyon",
      numeroPermanent: "2009082201",
      statutPaiement: "EN_ATTENTE",
      classeId: 1,
      nomClasse: "CM1-A"
    }
  ],
  
  classes: [
    {
      id: 1,
      nomClasse: "CM1-A",
      anneeScolaire: "2024-2025",
      enseignantId: 2,
      nomEnseignant: "Marie Martin",
      nombreEleves: 25
    },
    {
      id: 2,
      nomClasse: "CM2-B",
      anneeScolaire: "2024-2025",
      enseignantId: 2,
      nomEnseignant: "Marie Martin",
      nombreEleves: 22
    }
  ],
  
  cours: [
    {
      id: 1,
      nom: "Mathématiques",
      ponderation: 2.0,
      classeId: 1,
      nomClasse: "CM1-A",
      enseignantId: 2,
      nomEnseignant: "Marie Martin"
    },
    {
      id: 2,
      nom: "Français",
      ponderation: 2.0,
      classeId: 1,
      nomClasse: "CM1-A",
      enseignantId: 2,
      nomEnseignant: "Marie Martin"
    }
  ],
  
  notes: [
    {
      id: 1,
      eleveId: 1,
      nomEleve: "Durant",
      prenomEleve: "Pierre",
      coursId: 1,
      nomCours: "Mathématiques",
      periode: "TRIMESTRE_1",
      pointObtenu: 16.5,
      ponderation: 20,
      dateSaisie: "2024-03-15T09:00:00"
    },
    {
      id: 2,
      eleveId: 2,
      nomEleve: "Leclerc",
      prenomEleve: "Sophie",
      coursId: 1,
      nomCours: "Mathématiques",
      periode: "TRIMESTRE_1",
      pointObtenu: 14.0,
      ponderation: 20,
      dateSaisie: "2024-03-15T09:15:00"
    }
  ],
  
  paiements: [
    {
      id: 1,
      eleveId: 1,
      nomEleve: "Durant",
      prenomEleve: "Pierre",
      montantTotal: 500.00,
      montantPaye: 500.00,
      montantRestant: 0.00,
      trimestre: "TRIMESTRE_1",
      dateMaj: "2024-02-01T10:00:00"
    },
    {
      id: 2,
      eleveId: 2,
      nomEleve: "Leclerc",
      prenomEleve: "Sophie",
      montantTotal: 500.00,
      montantPaye: 200.00,
      montantRestant: 300.00,
      trimestre: "TRIMESTRE_1",
      dateMaj: "2024-02-15T14:30:00"
    }
  ],
  
  communications: [
    {
      id: 1,
      expediteurId: 2,
      nomExpediteur: "Marie Martin",
      destinataireId: 1,
      nomDestinataire: "Jean Dupont",
      sujet: "Réunion parents-professeurs",
      contenu: "Une réunion parents-professeurs aura lieu le 15 avril prochain à 18h30 en salle polyvalente.",
      type: "INFORMATION",
      dateEnvoi: "2024-03-20T16:45:00"
    }
  ],
  
  roles: [
    { id: 1, nom: "ADMIN" },
    { id: 2, nom: "ENSEIGNANT" },
    { id: 3, nom: "PARENT" },
    { id: 4, nom: "ELEVE" }
  ]
};
