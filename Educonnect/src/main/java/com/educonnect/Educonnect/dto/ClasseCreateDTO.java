package com.educonnect.Educonnect.dto;

import jakarta.validation.constraints.NotBlank;

public record ClasseCreateDTO(
    @NotBlank(message = "Le nom de la classe est obligatoire")
    String nomClasse,
    
    String anneeScolaire,
    Long enseignantId
) {}
