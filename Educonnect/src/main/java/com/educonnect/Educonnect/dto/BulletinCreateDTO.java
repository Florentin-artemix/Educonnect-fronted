package com.educonnect.Educonnect.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record BulletinCreateDTO(
    @NotNull(message = "L'élève est obligatoire")
    Long eleveId,
    
    @NotNull(message = "La classe est obligatoire")
    Long classeId,
    
    String periode,
    BigDecimal moyenneGenerale,
    BigDecimal pourcentageObtenu,
    Integer rangClasse,
    Integer nombreElevesClasse,
    String appreciationGenerale,
    String bulletinPdfPath
) {}
