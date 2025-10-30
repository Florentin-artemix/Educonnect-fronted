package com.educonnect.Educonnect.dto;

import java.math.BigDecimal;

public record BulletinUpdateDTO(
    Long eleveId,
    Long classeId,
    String periode,
    BigDecimal moyenneGenerale,
    BigDecimal pourcentageObtenu,
    Integer rangClasse,
    Integer nombreElevesClasse,
    String appreciationGenerale,
    String bulletinPdfPath
) {}
