package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.Cours;
import com.educonnect.Educonnect.entity.Classe;
import com.educonnect.Educonnect.entity.User;
import com.educonnect.Educonnect.repository.CoursRepository;
import com.educonnect.Educonnect.repository.ClasseRepository;
import com.educonnect.Educonnect.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cours")
@CrossOrigin(origins = "*")
public class CoursController {

    @Autowired
    private CoursRepository coursRepository;

    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<CoursDTO>> getAllCours() {
        List<CoursDTO> cours = coursRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(cours);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoursDTO> getCoursById(@PathVariable Long id) {
        return coursRepository.findById(id)
            .map(cours -> ResponseEntity.ok(convertToDTO(cours)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CoursDTO> createCours(@Valid @RequestBody CoursCreateDTO createDTO) {
        Cours cours = new Cours();
        cours.setNom(createDTO.nom());
        cours.setPonderation(createDTO.ponderation());

        if (createDTO.classeId() != null) {
            Classe classe = classeRepository.findById(createDTO.classeId())
                .orElseThrow(() -> new RuntimeException("Classe non trouvée"));
            cours.setClasse(classe);
        }

        if (createDTO.enseignantId() != null) {
            User enseignant = userRepository.findById(createDTO.enseignantId())
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé"));
            cours.setEnseignant(enseignant);
        }

        Cours savedCours = coursRepository.save(cours);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedCours));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CoursDTO> updateCours(@PathVariable Long id, @RequestBody CoursUpdateDTO updateDTO) {
        return coursRepository.findById(id)
            .map(cours -> {
                if (updateDTO.nom() != null) cours.setNom(updateDTO.nom());
                if (updateDTO.ponderation() != null) cours.setPonderation(updateDTO.ponderation());
                
                if (updateDTO.classeId() != null) {
                    Classe classe = classeRepository.findById(updateDTO.classeId())
                        .orElseThrow(() -> new RuntimeException("Classe non trouvée"));
                    cours.setClasse(classe);
                }

                if (updateDTO.enseignantId() != null) {
                    User enseignant = userRepository.findById(updateDTO.enseignantId())
                        .orElseThrow(() -> new RuntimeException("Enseignant non trouvé"));
                    cours.setEnseignant(enseignant);
                }

                Cours updatedCours = coursRepository.save(cours);
                return ResponseEntity.ok(convertToDTO(updatedCours));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCours(@PathVariable Long id) {
        if (!coursRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        coursRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private CoursDTO convertToDTO(Cours cours) {
        return new CoursDTO(
            cours.getId(),
            cours.getNom(),
            cours.getPonderation(),
            cours.getClasse() != null ? cours.getClasse().getId() : null,
            cours.getClasse() != null ? cours.getClasse().getNomClasse() : null,
            cours.getEnseignant() != null ? cours.getEnseignant().getId() : null,
            cours.getEnseignant() != null ? 
                cours.getEnseignant().getNom() + " " + cours.getEnseignant().getPrenom() : null
        );
    }
}
