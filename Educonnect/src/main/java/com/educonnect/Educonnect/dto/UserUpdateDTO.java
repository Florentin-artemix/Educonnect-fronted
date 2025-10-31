package com.educonnect.Educonnect.dto;

import java.util.Set;

public record UserUpdateDTO(
    String nom,
    String prenom,
    String email,
    String motDePasse,
    String numeroTelephone,
    String adresse,
    Set<String> roles  // Noms des rôles : "ADMIN", "ENSEIGNANT", "PARENT", "PERCEPTEUR"
) {}
