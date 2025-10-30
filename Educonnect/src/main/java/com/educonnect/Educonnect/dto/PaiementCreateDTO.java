package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Paiement.Trimestre;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PaiementCreateDTO(
    @NotNull(message = "L'élève est obligatoire")
    Long eleveId,
    
    @NotNull(message = "Le montant total est obligatoire")
    BigDecimal montantTotal,
    
    @NotNull(message = "Le montant payé est obligatoire")
    BigDecimal montantPaye,
    
    @NotNull(message = "Le trimestre est obligatoire")
    Trimestre trimestre
) {}
