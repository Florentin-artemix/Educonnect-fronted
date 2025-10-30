package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Paiement.Trimestre;

import java.math.BigDecimal;

public record PaiementUpdateDTO(
    Long eleveId,
    BigDecimal montantTotal,
    BigDecimal montantPaye,
    Trimestre trimestre
) {}
