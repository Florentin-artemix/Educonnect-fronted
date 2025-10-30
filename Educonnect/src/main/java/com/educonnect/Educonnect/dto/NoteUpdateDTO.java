package com.educonnect.Educonnect.dto;

import java.math.BigDecimal;

public record NoteUpdateDTO(
    Long eleveId,
    Long coursId,
    String periode,
    BigDecimal pointObtenu,
    Integer ponderation
) {}
