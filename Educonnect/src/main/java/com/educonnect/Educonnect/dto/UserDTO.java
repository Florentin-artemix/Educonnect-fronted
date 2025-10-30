package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Role;

import java.time.LocalDateTime;
import java.util.Set;

public record UserDTO(
    Long id,
    String nom,
    String prenom,
    String email,
    String numeroTelephone,
    String adresse,
    Set<Role.NomRole> roles,
    LocalDateTime dateCreation
) {}
