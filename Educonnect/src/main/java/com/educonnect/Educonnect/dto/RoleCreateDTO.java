package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Role.NomRole;
import jakarta.validation.constraints.NotNull;

public record RoleCreateDTO(
    @NotNull(message = "Le nom du rôle est obligatoire")
    NomRole nomRole
) {}
