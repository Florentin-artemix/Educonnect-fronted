package com.educonnect.Educonnect.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record NoteCreateDTO(
    @NotNull(message = "L'élève est obligatoire")
    Long eleveId,
    
    @NotNull(message = "Le cours est obligatoire")
    Long coursId,
    
    String periode,
    
    @NotNull(message = "Le point obtenu est obligatoire")
    BigDecimal pointObtenu,
    
    @NotNull(message = "La pondération est obligatoire")
    Integer ponderation
) {}
