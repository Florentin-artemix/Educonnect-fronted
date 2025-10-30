package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Communication.TypeCommunication;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommunicationCreateDTO(
    @NotNull(message = "L'expéditeur est obligatoire")
    Long expediteurId,
    
    @NotNull(message = "Le destinataire est obligatoire")
    Long destinataireId,
    
    @NotBlank(message = "Le sujet est obligatoire")
    String sujet,
    
    @NotBlank(message = "Le contenu est obligatoire")
    String contenu,
    
    @NotNull(message = "Le type est obligatoire")
    TypeCommunication type
) {}
