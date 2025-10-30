package com.educonnect.Educonnect.dto;

public record CoursUpdateDTO(
    String nom,
    Integer ponderation,
    Long classeId,
    Long enseignantId
) {}
