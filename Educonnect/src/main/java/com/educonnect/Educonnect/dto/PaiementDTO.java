package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Paiement.Trimestre;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaiementDTO(
    Long id,
    Long eleveId,
    String nomEleve,
    String prenomEleve,
    BigDecimal montantTotal,
    BigDecimal montantPaye,
    BigDecimal montantRestant,
    Trimestre trimestre,
    LocalDateTime dateMaj
) {}
