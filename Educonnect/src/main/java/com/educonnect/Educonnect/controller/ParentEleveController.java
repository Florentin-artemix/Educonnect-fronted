package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.ParentEleve;
import com.educonnect.Educonnect.entity.User;
import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.repository.ParentEleveRepository;
import com.educonnect.Educonnect.repository.UserRepository;
import com.educonnect.Educonnect.repository.EleveRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/parents-eleves")
@CrossOrigin(origins = "*")
public class ParentEleveController {

    @Autowired
    private ParentEleveRepository parentEleveRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EleveRepository eleveRepository;

    @GetMapping
    public ResponseEntity<List<ParentEleveDTO>> getAllParentsEleves() {
        List<ParentEleveDTO> parentsEleves = parentEleveRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(parentsEleves);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParentEleveDTO> getParentEleveById(@PathVariable Long id) {
        return parentEleveRepository.findById(id)
            .map(parentEleve -> ResponseEntity.ok(convertToDTO(parentEleve)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ParentEleveDTO> createParentEleve(@Valid @RequestBody ParentEleveCreateDTO createDTO) {
        ParentEleve parentEleve = new ParentEleve();

        User parent = userRepository.findById(createDTO.parentId())
            .orElseThrow(() -> new RuntimeException("Parent non trouvé"));
        parentEleve.setParent(parent);

        Eleve eleve = eleveRepository.findById(createDTO.eleveId())
            .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
        parentEleve.setEleve(eleve);

        ParentEleve savedParentEleve = parentEleveRepository.save(parentEleve);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedParentEleve));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ParentEleveDTO> updateParentEleve(@PathVariable Long id, @RequestBody ParentEleveUpdateDTO updateDTO) {
        return parentEleveRepository.findById(id)
            .map(parentEleve -> {
                if (updateDTO.parentId() != null) {
                    User parent = userRepository.findById(updateDTO.parentId())
                        .orElseThrow(() -> new RuntimeException("Parent non trouvé"));
                    parentEleve.setParent(parent);
                }

                if (updateDTO.eleveId() != null) {
                    Eleve eleve = eleveRepository.findById(updateDTO.eleveId())
                        .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
                    parentEleve.setEleve(eleve);
                }

                ParentEleve updatedParentEleve = parentEleveRepository.save(parentEleve);
                return ResponseEntity.ok(convertToDTO(updatedParentEleve));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParentEleve(@PathVariable Long id) {
        if (!parentEleveRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        parentEleveRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private ParentEleveDTO convertToDTO(ParentEleve parentEleve) {
        return new ParentEleveDTO(
            parentEleve.getId(),
            parentEleve.getParent() != null ? parentEleve.getParent().getId() : null,
            parentEleve.getParent() != null ? parentEleve.getParent().getNom() : null,
            parentEleve.getParent() != null ? parentEleve.getParent().getPrenom() : null,
            parentEleve.getParent() != null ? parentEleve.getParent().getEmail() : null,
            parentEleve.getEleve() != null ? parentEleve.getEleve().getId() : null,
            parentEleve.getEleve() != null ? parentEleve.getEleve().getNom() : null,
            parentEleve.getEleve() != null ? parentEleve.getEleve().getPrenom() : null
        );
    }
}
