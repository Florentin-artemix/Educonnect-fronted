package com.educonnect.Educonnect.dto;

import jakarta.validation.constraints.NotNull;

public record AdresseEleveCreateDTO(
    String ville,
    String communeTerritoire,
    String ecole,
    String code,
    
    @NotNull(message = "L'élève est obligatoire")
    Long eleveId
) {}
