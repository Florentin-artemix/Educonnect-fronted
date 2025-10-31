package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.Communication;
import com.educonnect.Educonnect.entity.User;
import com.educonnect.Educonnect.repository.CommunicationRepository;
import com.educonnect.Educonnect.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/communications")
@CrossOrigin(origins = "*")
public class CommunicationController {

    @Autowired
    private CommunicationRepository communicationRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<CommunicationDTO>> getAllCommunications() {
        List<CommunicationDTO> communications = communicationRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(communications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunicationDTO> getCommunicationById(@PathVariable Long id) {
        return communicationRepository.findById(id)
            .map(communication -> ResponseEntity.ok(convertToDTO(communication)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CommunicationDTO> createCommunication(@Valid @RequestBody CommunicationCreateDTO createDTO) {
        Communication communication = new Communication();
        
        User expediteur = userRepository.findById(createDTO.expediteurId())
            .orElseThrow(() -> new RuntimeException("Expéditeur non trouvé"));
        communication.setExpediteur(expediteur);

        User destinataire = userRepository.findById(createDTO.destinataireId())
            .orElseThrow(() -> new RuntimeException("Destinataire non trouvé"));
        communication.setDestinataire(destinataire);

        communication.setSujet(createDTO.sujet());
        communication.setContenu(createDTO.contenu());
        communication.setType(createDTO.type());

        Communication savedCommunication = communicationRepository.save(communication);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedCommunication));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CommunicationDTO> updateCommunication(@PathVariable Long id, @RequestBody CommunicationUpdateDTO updateDTO) {
        return communicationRepository.findById(id)
            .map(communication -> {
                if (updateDTO.expediteurId() != null) {
                    User expediteur = userRepository.findById(updateDTO.expediteurId())
                        .orElseThrow(() -> new RuntimeException("Expéditeur non trouvé"));
                    communication.setExpediteur(expediteur);
                }

                if (updateDTO.destinataireId() != null) {
                    User destinataire = userRepository.findById(updateDTO.destinataireId())
                        .orElseThrow(() -> new RuntimeException("Destinataire non trouvé"));
                    communication.setDestinataire(destinataire);
                }

                if (updateDTO.sujet() != null) communication.setSujet(updateDTO.sujet());
                if (updateDTO.contenu() != null) communication.setContenu(updateDTO.contenu());
                if (updateDTO.type() != null) communication.setType(updateDTO.type());

                Communication updatedCommunication = communicationRepository.save(communication);
                return ResponseEntity.ok(convertToDTO(updatedCommunication));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunication(@PathVariable Long id) {
        if (!communicationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        communicationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getTypesCommunication() {
        List<String> types = java.util.Arrays.stream(Communication.TypeCommunication.values())
            .map(Enum::name)
            .collect(Collectors.toList());
        return ResponseEntity.ok(types);
    }

    private CommunicationDTO convertToDTO(Communication communication) {
        return new CommunicationDTO(
            communication.getId(),
            communication.getExpediteur() != null ? communication.getExpediteur().getId() : null,
            communication.getExpediteur() != null ? 
                communication.getExpediteur().getNom() + " " + communication.getExpediteur().getPrenom() : null,
            communication.getDestinataire() != null ? communication.getDestinataire().getId() : null,
            communication.getDestinataire() != null ? 
                communication.getDestinataire().getNom() + " " + communication.getDestinataire().getPrenom() : null,
            communication.getSujet(),
            communication.getContenu(),
            communication.getType(),
            communication.getDateEnvoi()
        );
    }
}
