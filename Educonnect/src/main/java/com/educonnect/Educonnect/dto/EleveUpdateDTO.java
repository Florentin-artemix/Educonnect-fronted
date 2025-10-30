package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Eleve.StatutPaiement;

import java.time.LocalDate;

public record EleveUpdateDTO(
    String nom,
    String prenom,
    LocalDate dateNaissance,
    String lieuNaissance,
    String numeroPermanent,
    StatutPaiement statutPaiement,
    Long classeId
) {}
