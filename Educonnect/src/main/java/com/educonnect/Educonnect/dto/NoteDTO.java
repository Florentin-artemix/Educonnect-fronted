package com.educonnect.Educonnect.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record NoteDTO(
    Long id,
    Long eleveId,
    String nomEleve,
    String prenomEleve,
    Long coursId,
    String nomCours,
    String periode,
    BigDecimal pointObtenu,
    Integer ponderation,
    LocalDateTime dateSaisie
) {}
