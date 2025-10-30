package com.educonnect.Educonnect.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BulletinDTO(
    Long id,
    Long eleveId,
    String nomEleve,
    String prenomEleve,
    Long classeId,
    String nomClasse,
    String periode,
    BigDecimal moyenneGenerale,
    BigDecimal pourcentageObtenu,
    Integer rangClasse,
    Integer nombreElevesClasse,
    String appreciationGenerale,
    LocalDateTime dateGeneration,
    String bulletinPdfPath
) {}
