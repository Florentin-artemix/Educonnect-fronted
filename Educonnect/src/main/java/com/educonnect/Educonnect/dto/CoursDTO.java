package com.educonnect.Educonnect.dto;

public record CoursDTO(
    Long id,
    String nom,
    Integer ponderation,
    Long classeId,
    String nomClasse,
    Long enseignantId,
    String nomEnseignant
) {}
