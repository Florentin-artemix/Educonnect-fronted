package com.educonnect.Educonnect.dto;

import java.math.BigDecimal;

public record DetailBulletinDTO(
    Long id,
    Long bulletinId,
    Long coursId,
    String nomCours,
    Long noteId,
    BigDecimal noteObtenue,
    Integer ponderation,
    BigDecimal moyennePonderee
) {}
