package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.DetailBulletin;
import com.educonnect.Educonnect.entity.Bulletin;
import com.educonnect.Educonnect.entity.Cours;
import com.educonnect.Educonnect.entity.Note;
import com.educonnect.Educonnect.repository.DetailBulletinRepository;
import com.educonnect.Educonnect.repository.BulletinRepository;
import com.educonnect.Educonnect.repository.CoursRepository;
import com.educonnect.Educonnect.repository.NoteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/details-bulletins")
@CrossOrigin(origins = "*")
public class DetailBulletinController {

    @Autowired
    private DetailBulletinRepository detailBulletinRepository;

    @Autowired
    private BulletinRepository bulletinRepository;

    @Autowired
    private CoursRepository coursRepository;

    @Autowired
    private NoteRepository noteRepository;

    @GetMapping
    public ResponseEntity<List<DetailBulletinDTO>> getAllDetailsBulletins() {
        List<DetailBulletinDTO> details = detailBulletinRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(details);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailBulletinDTO> getDetailBulletinById(@PathVariable Long id) {
        return detailBulletinRepository.findById(id)
            .map(detail -> ResponseEntity.ok(convertToDTO(detail)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DetailBulletinDTO> createDetailBulletin(@Valid @RequestBody DetailBulletinCreateDTO createDTO) {
        DetailBulletin detail = new DetailBulletin();

        Bulletin bulletin = bulletinRepository.findById(createDTO.bulletinId())
            .orElseThrow(() -> new RuntimeException("Bulletin non trouvé"));
        detail.setBulletin(bulletin);

        Cours cours = coursRepository.findById(createDTO.coursId())
            .orElseThrow(() -> new RuntimeException("Cours non trouvé"));
        detail.setCours(cours);

        if (createDTO.noteId() != null) {
            Note note = noteRepository.findById(createDTO.noteId())
                .orElseThrow(() -> new RuntimeException("Note non trouvée"));
            detail.setNote(note);
        }

        detail.setNoteObtenue(createDTO.noteObtenue());
        detail.setPonderation(createDTO.ponderation());
        detail.setMoyennePonderee(createDTO.moyennePonderee());

        DetailBulletin savedDetail = detailBulletinRepository.save(detail);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedDetail));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<DetailBulletinDTO> updateDetailBulletin(@PathVariable Long id, @RequestBody DetailBulletinUpdateDTO updateDTO) {
        return detailBulletinRepository.findById(id)
            .map(detail -> {
                if (updateDTO.bulletinId() != null) {
                    Bulletin bulletin = bulletinRepository.findById(updateDTO.bulletinId())
                        .orElseThrow(() -> new RuntimeException("Bulletin non trouvé"));
                    detail.setBulletin(bulletin);
                }

                if (updateDTO.coursId() != null) {
                    Cours cours = coursRepository.findById(updateDTO.coursId())
                        .orElseThrow(() -> new RuntimeException("Cours non trouvé"));
                    detail.setCours(cours);
                }

                if (updateDTO.noteId() != null) {
                    Note note = noteRepository.findById(updateDTO.noteId())
                        .orElseThrow(() -> new RuntimeException("Note non trouvée"));
                    detail.setNote(note);
                }

                if (updateDTO.noteObtenue() != null) detail.setNoteObtenue(updateDTO.noteObtenue());
                if (updateDTO.ponderation() != null) detail.setPonderation(updateDTO.ponderation());
                if (updateDTO.moyennePonderee() != null) detail.setMoyennePonderee(updateDTO.moyennePonderee());

                DetailBulletin updatedDetail = detailBulletinRepository.save(detail);
                return ResponseEntity.ok(convertToDTO(updatedDetail));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetailBulletin(@PathVariable Long id) {
        if (!detailBulletinRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        detailBulletinRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private DetailBulletinDTO convertToDTO(DetailBulletin detail) {
        return new DetailBulletinDTO(
            detail.getId(),
            detail.getBulletin() != null ? detail.getBulletin().getId() : null,
            detail.getCours() != null ? detail.getCours().getId() : null,
            detail.getCours() != null ? detail.getCours().getNom() : null,
            detail.getNote() != null ? detail.getNote().getId() : null,
            detail.getNoteObtenue(),
            detail.getPonderation(),
            detail.getMoyennePonderee()
        );
    }
}
