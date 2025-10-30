package com.educonnect.Educonnect.dto;

import java.math.BigDecimal;

public record DetailBulletinUpdateDTO(
    Long bulletinId,
    Long coursId,
    Long noteId,
    BigDecimal noteObtenue,
    Integer ponderation,
    BigDecimal moyennePonderee
) {}
