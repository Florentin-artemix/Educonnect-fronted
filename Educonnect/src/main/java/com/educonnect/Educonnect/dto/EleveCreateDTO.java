package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Eleve.StatutPaiement;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record EleveCreateDTO(
    @NotBlank(message = "Le nom est obligatoire")
    String nom,
    
    @NotBlank(message = "Le prénom est obligatoire")
    String prenom,
    
    LocalDate dateNaissance,
    String lieuNaissance,
    String numeroPermanent,
    StatutPaiement statutPaiement,
    Long classeId
) {}
