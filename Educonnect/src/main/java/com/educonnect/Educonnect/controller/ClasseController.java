package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.Classe;
import com.educonnect.Educonnect.entity.User;
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
@RequestMapping("/api/classes")
@CrossOrigin(origins = "*")
public class ClasseController {

    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ClasseDTO>> getAllClasses() {
        List<ClasseDTO> classes = classeRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(classes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClasseDTO> getClasseById(@PathVariable Long id) {
        return classeRepository.findById(id)
            .map(classe -> ResponseEntity.ok(convertToDTO(classe)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ClasseDTO> createClasse(@Valid @RequestBody ClasseCreateDTO createDTO) {
        Classe classe = new Classe();
        classe.setNomClasse(createDTO.nomClasse());
        classe.setAnneeScolaire(createDTO.anneeScolaire());

        if (createDTO.enseignantId() != null) {
            User enseignant = userRepository.findById(createDTO.enseignantId())
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé"));
            classe.setEnseignant(enseignant);
        }

        Classe savedClasse = classeRepository.save(classe);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedClasse));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ClasseDTO> updateClasse(@PathVariable Long id, @RequestBody ClasseUpdateDTO updateDTO) {
        return classeRepository.findById(id)
            .map(classe -> {
                if (updateDTO.nomClasse() != null) classe.setNomClasse(updateDTO.nomClasse());
                if (updateDTO.anneeScolaire() != null) classe.setAnneeScolaire(updateDTO.anneeScolaire());
                
                if (updateDTO.enseignantId() != null) {
                    User enseignant = userRepository.findById(updateDTO.enseignantId())
                        .orElseThrow(() -> new RuntimeException("Enseignant non trouvé"));
                    classe.setEnseignant(enseignant);
                }

                Classe updatedClasse = classeRepository.save(classe);
                return ResponseEntity.ok(convertToDTO(updatedClasse));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable Long id) {
        if (!classeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        classeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private ClasseDTO convertToDTO(Classe classe) {
        return new ClasseDTO(
            classe.getId(),
            classe.getNomClasse(),
            classe.getAnneeScolaire(),
            classe.getEnseignant() != null ? classe.getEnseignant().getId() : null,
            classe.getEnseignant() != null ? 
                classe.getEnseignant().getNom() + " " + classe.getEnseignant().getPrenom() : null,
            classe.getEleves() != null ? classe.getEleves().size() : 0
        );
    }
}
