package com.educonnect.Educonnect.dto;

import jakarta.validation.constraints.NotNull;

public record ParentEleveCreateDTO(
    @NotNull(message = "Le parent est obligatoire")
    Long parentId,
    
    @NotNull(message = "L'élève est obligatoire")
    Long eleveId
) {}
