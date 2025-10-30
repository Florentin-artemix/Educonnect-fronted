package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.Note;
import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.entity.Cours;
import com.educonnect.Educonnect.repository.NoteRepository;
import com.educonnect.Educonnect.repository.EleveRepository;
import com.educonnect.Educonnect.repository.CoursRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private EleveRepository eleveRepository;

    @Autowired
    private CoursRepository coursRepository;

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getAllNotes() {
        List<NoteDTO> notes = noteRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long id) {
        return noteRepository.findById(id)
            .map(note -> ResponseEntity.ok(convertToDTO(note)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<NoteDTO> createNote(@Valid @RequestBody NoteCreateDTO createDTO) {
        Note note = new Note();
        
        Eleve eleve = eleveRepository.findById(createDTO.eleveId())
            .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
        note.setEleve(eleve);

        Cours cours = coursRepository.findById(createDTO.coursId())
            .orElseThrow(() -> new RuntimeException("Cours non trouvé"));
        note.setCours(cours);

        note.setPeriode(createDTO.periode());
        note.setPointObtenu(createDTO.pointObtenu());
        note.setPonderation(createDTO.ponderation());

        Note savedNote = noteRepository.save(note);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedNote));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<NoteDTO> updateNote(@PathVariable Long id, @RequestBody NoteUpdateDTO updateDTO) {
        return noteRepository.findById(id)
            .map(note -> {
                if (updateDTO.eleveId() != null) {
                    Eleve eleve = eleveRepository.findById(updateDTO.eleveId())
                        .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
                    note.setEleve(eleve);
                }

                if (updateDTO.coursId() != null) {
                    Cours cours = coursRepository.findById(updateDTO.coursId())
                        .orElseThrow(() -> new RuntimeException("Cours non trouvé"));
                    note.setCours(cours);
                }

                if (updateDTO.periode() != null) note.setPeriode(updateDTO.periode());
                if (updateDTO.pointObtenu() != null) note.setPointObtenu(updateDTO.pointObtenu());
                if (updateDTO.ponderation() != null) note.setPonderation(updateDTO.ponderation());

                Note updatedNote = noteRepository.save(note);
                return ResponseEntity.ok(convertToDTO(updatedNote));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        if (!noteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        noteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private NoteDTO convertToDTO(Note note) {
        return new NoteDTO(
            note.getId(),
            note.getEleve() != null ? note.getEleve().getId() : null,
            note.getEleve() != null ? note.getEleve().getNom() : null,
            note.getEleve() != null ? note.getEleve().getPrenom() : null,
            note.getCours() != null ? note.getCours().getId() : null,
            note.getCours() != null ? note.getCours().getNom() : null,
            note.getPeriode(),
            note.getPointObtenu(),
            note.getPonderation(),
            note.getDateSaisie()
        );
    }
}
