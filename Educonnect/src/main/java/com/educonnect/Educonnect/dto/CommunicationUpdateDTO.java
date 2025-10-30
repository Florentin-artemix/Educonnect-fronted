package com.educonnect.Educonnect.dto;

import com.educonnect.Educonnect.entity.Communication.TypeCommunication;

public record CommunicationUpdateDTO(
    Long expediteurId,
    Long destinataireId,
    String sujet,
    String contenu,
    TypeCommunication type
) {}
