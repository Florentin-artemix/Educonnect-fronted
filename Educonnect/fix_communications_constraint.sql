-- Script de correction de la contrainte communications_type_check
-- À exécuter dans pgAdmin ou DBeaver sur la base de données : postgres

-- 1. Vérifier les données existantes
SELECT id, type, sujet FROM communications;

-- 2. Si des données existent avec les anciennes valeurs, les migrer d'abord
-- Décommentez ces lignes si nécessaire :
-- UPDATE communications SET type = 'INFORMATION' WHERE type = 'OFFICIEL';
-- UPDATE communications SET type = 'INFORMATION' WHERE type = 'PARENT';
-- UPDATE communications SET type = 'INFORMATION' WHERE type = 'ENSEIGNANT';

-- 3. Supprimer l'ancienne contrainte
ALTER TABLE communications DROP CONSTRAINT IF EXISTS communications_type_check;

-- 4. Créer la nouvelle contrainte avec les bonnes valeurs
ALTER TABLE communications ADD CONSTRAINT communications_type_check 
CHECK (type IN ('INFORMATION', 'ALERTE', 'RAPPEL', 'CONVOCATION'));

-- 5. Vérifier que la contrainte a été créée
SELECT conname, contype, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'communications_type_check';
