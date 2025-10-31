package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.entity.Classe;
import com.educonnect.Educonnect.repository.EleveRepository;
import com.educonnect.Educonnect.repository.ClasseRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/eleves")
@CrossOrigin(origins = "*")
public class EleveController {

    @Autowired
    private EleveRepository eleveRepository;

    @Autowired
    private ClasseRepository classeRepository;

    @GetMapping
    public ResponseEntity<List<EleveDTO>> getAllEleves() {
        List<EleveDTO> eleves = eleveRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(eleves);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EleveDTO> getEleveById(@PathVariable Long id) {
        return eleveRepository.findById(id)
            .map(eleve -> ResponseEntity.ok(convertToDTO(eleve)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EleveDTO> createEleve(@Valid @RequestBody EleveCreateDTO createDTO) {
        Eleve eleve = new Eleve();
        eleve.setNom(createDTO.nom());
        eleve.setPrenom(createDTO.prenom());
        eleve.setDateNaissance(createDTO.dateNaissance());
        eleve.setLieuNaissance(createDTO.lieuNaissance());
        eleve.setNumeroPermanent(createDTO.numeroPermanent());
        eleve.setStatutPaiement(createDTO.statutPaiement());

        if (createDTO.classeId() != null) {
            Classe classe = classeRepository.findById(createDTO.classeId())
                .orElseThrow(() -> new RuntimeException("Classe non trouvée"));
            eleve.setClasse(classe);
        }

        Eleve savedEleve = eleveRepository.save(eleve);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedEleve));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EleveDTO> updateEleve(@PathVariable Long id, @RequestBody EleveUpdateDTO updateDTO) {
        return eleveRepository.findById(id)
            .map(eleve -> {
                if (updateDTO.nom() != null) eleve.setNom(updateDTO.nom());
                if (updateDTO.prenom() != null) eleve.setPrenom(updateDTO.prenom());
                if (updateDTO.dateNaissance() != null) eleve.setDateNaissance(updateDTO.dateNaissance());
                if (updateDTO.lieuNaissance() != null) eleve.setLieuNaissance(updateDTO.lieuNaissance());
                if (updateDTO.numeroPermanent() != null) eleve.setNumeroPermanent(updateDTO.numeroPermanent());
                if (updateDTO.statutPaiement() != null) eleve.setStatutPaiement(updateDTO.statutPaiement());
                
                if (updateDTO.classeId() != null) {
                    Classe classe = classeRepository.findById(updateDTO.classeId())
                        .orElseThrow(() -> new RuntimeException("Classe non trouvée"));
                    eleve.setClasse(classe);
                }

                Eleve updatedEleve = eleveRepository.save(eleve);
                return ResponseEntity.ok(convertToDTO(updatedEleve));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEleve(@PathVariable Long id) {
        if (!eleveRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eleveRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/statuts-paiement")
    public ResponseEntity<List<String>> getStatutsPaiement() {
        List<String> statuts = java.util.Arrays.stream(Eleve.StatutPaiement.values())
            .map(Enum::name)
            .collect(Collectors.toList());
        return ResponseEntity.ok(statuts);
    }

    private EleveDTO convertToDTO(Eleve eleve) {
        return new EleveDTO(
            eleve.getId(),
            eleve.getNom(),
            eleve.getPrenom(),
            eleve.getDateNaissance(),
            eleve.getLieuNaissance(),
            eleve.getNumeroPermanent(),
            eleve.getStatutPaiement(),
            eleve.getClasse() != null ? eleve.getClasse().getId() : null,
            eleve.getClasse() != null ? eleve.getClasse().getNomClasse() : null
        );
    }
}
