package com.educonnect.Educonnect.dto;

public record ClasseDTO(
    Long id,
    String nomClasse,
    String anneeScolaire,
    Long enseignantId,
    String nomEnseignant,
    Integer nombreEleves
) {}
