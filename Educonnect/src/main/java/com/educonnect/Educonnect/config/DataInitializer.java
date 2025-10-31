package com.educonnect.Educonnect.config;

import com.educonnect.Educonnect.entity.Role;
import com.educonnect.Educonnect.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialiser les rôles si la table est vide
        if (roleRepository.count() == 0) {
            System.out.println("🔧 Initialisation des rôles par défaut...");
            
            // Créer et sauvegarder chaque rôle basé sur l'enum NomRole
            for (Role.NomRole nomRole : Role.NomRole.values()) {
                if (!roleRepository.existsByNomRole(nomRole)) {
                    Role role = new Role();
                    role.setNomRole(nomRole);
                    roleRepository.save(role);
                    System.out.println("✅ Rôle créé : " + nomRole);
                }
            }
            
            System.out.println("✅ Tous les rôles ont été initialisés avec succès !");
        } else {
            System.out.println("ℹ️ Rôles déjà présents dans la base de données (" + roleRepository.count() + " rôle(s))");
            
            // Vérifier et ajouter les rôles manquants
            for (Role.NomRole nomRole : Role.NomRole.values()) {
                if (!roleRepository.existsByNomRole(nomRole)) {
                    Role role = new Role();
                    role.setNomRole(nomRole);
                    roleRepository.save(role);
                    System.out.println("✅ Rôle manquant ajouté : " + nomRole);
                }
            }
        }
    }
}
