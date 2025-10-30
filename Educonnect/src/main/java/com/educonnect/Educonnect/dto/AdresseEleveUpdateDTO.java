package com.educonnect.Educonnect.dto;

public record AdresseEleveUpdateDTO(
    String ville,
    String communeTerritoire,
    String ecole,
    String code,
    Long eleveId
) {}
