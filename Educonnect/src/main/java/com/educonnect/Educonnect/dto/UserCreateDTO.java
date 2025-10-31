package com.educonnect.Educonnect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public record UserCreateDTO(
    @NotBlank(message = "Le nom est obligatoire")
    String nom,
    
    @NotBlank(message = "Le prénom est obligatoire")
    String prenom,
    
    @Email(message = "Email invalide")
    @NotBlank(message = "L'email est obligatoire")
    String email,
    
    @NotBlank(message = "Le mot de passe est obligatoire")
    String motDePasse,
    
    String numeroTelephone,
    String adresse,
    Set<String> roles  // Noms des rôles : "ADMIN", "ENSEIGNANT", "PARENT", "PERCEPTEUR"
) {}
