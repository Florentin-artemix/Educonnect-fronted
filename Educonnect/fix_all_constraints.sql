-- ========================================
-- SCRIPT COMPLET DE CORRECTION DES CONTRAINTES
-- Base de données : postgres
-- À exécuter dans pgAdmin ou DBeaver
-- ========================================

-- ========================================
-- 1. CONTRAINTE PAIEMENTS - TRIMESTRE
-- ========================================
ALTER TABLE paiements DROP CONSTRAINT IF EXISTS paiements_trimestre_check;
ALTER TABLE paiements ADD CONSTRAINT paiements_trimestre_check 
CHECK (trimestre IN ('TRIMESTRE_1', 'TRIMESTRE_2', 'TRIMESTRE_3'));

-- ========================================
-- 2. CONTRAINTE COMMUNICATIONS - TYPE
-- ========================================
ALTER TABLE communications DROP CONSTRAINT IF EXISTS communications_type_check;
ALTER TABLE communications ADD CONSTRAINT communications_type_check 
CHECK (type IN ('INFORMATION', 'ALERTE', 'RAPPEL', 'CONVOCATION'));

-- ========================================
-- 3. CONTRAINTE ELEVES - STATUT_PAIEMENT
-- ========================================
ALTER TABLE eleves DROP CONSTRAINT IF EXISTS eleves_statut_paiement_check;
ALTER TABLE eleves ADD CONSTRAINT eleves_statut_paiement_check 
CHECK (statut_paiement IN ('DEROGATION', 'NON_EN_ORDRE', 'EN_ORDRE'));

-- ========================================
-- VÉRIFICATION DES CONTRAINTES CRÉÉES
-- ========================================
SELECT conname, conrelid::regclass AS table_name, pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conname IN ('paiements_trimestre_check', 'communications_type_check', 'eleves_statut_paiement_check')
ORDER BY conname;

-- ========================================
-- FIN DU SCRIPT
-- ========================================
