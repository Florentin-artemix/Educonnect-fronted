package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Communication.TypeCommunication;

import java.time.LocalDateTime;

public record CommunicationDTO(
    Long id,
    Long expediteurId,
    String nomExpediteur,
    Long destinataireId,
    String nomDestinataire,
    String sujet,
    String contenu,
    TypeCommunication type,
    LocalDateTime dateEnvoi
) {}
