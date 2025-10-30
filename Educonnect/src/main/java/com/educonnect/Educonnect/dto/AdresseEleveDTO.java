package com.educonnect.Educonnect.dto;

public record AdresseEleveDTO(
    Long id,
    String ville,
    String communeTerritoire,
    String ecole,
    String code,
    Long eleveId,
    String nomEleve
) {}
