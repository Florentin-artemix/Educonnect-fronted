package com.educonnect.Educonnect.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DetailBulletinCreateDTO(
    @NotNull(message = "Le bulletin est obligatoire")
    Long bulletinId,
    
    @NotNull(message = "Le cours est obligatoire")
    Long coursId,
    
    Long noteId,
    
    @NotNull(message = "La note obtenue est obligatoire")
    BigDecimal noteObtenue,
    
    @NotNull(message = "La pondération est obligatoire")
    Integer ponderation,
    
    BigDecimal moyennePonderee
) {}
