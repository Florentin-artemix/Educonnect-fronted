package com.educonnect.Educonnect.dto;

public record ParentEleveDTO(
    Long id,
    Long parentId,
    String nomParent,
    String prenomParent,
    String emailParent,
    Long eleveId,
    String nomEleve,
    String prenomEleve
) {}
