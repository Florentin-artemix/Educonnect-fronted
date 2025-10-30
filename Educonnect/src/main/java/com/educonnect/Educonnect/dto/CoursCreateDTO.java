package com.educonnect.Educonnect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CoursCreateDTO(
    @NotBlank(message = "Le nom du cours est obligatoire")
    String nom,
    
    @NotNull(message = "La pondération est obligatoire")
    Integer ponderation,
    
    Long classeId,
    Long enseignantId
) {}
