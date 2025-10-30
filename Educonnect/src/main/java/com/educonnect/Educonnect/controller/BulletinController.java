package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.Bulletin;
import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.entity.Classe;
import com.educonnect.Educonnect.repository.BulletinRepository;
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
@RequestMapping("/api/bulletins")
@CrossOrigin(origins = "*")
public class BulletinController {

    @Autowired
    private BulletinRepository bulletinRepository;

    @Autowired
    private EleveRepository eleveRepository;

    @Autowired
    private ClasseRepository classeRepository;

    @GetMapping
    public ResponseEntity<List<BulletinDTO>> getAllBulletins() {
        List<BulletinDTO> bulletins = bulletinRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(bulletins);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BulletinDTO> getBulletinById(@PathVariable Long id) {
        return bulletinRepository.findById(id)
            .map(bulletin -> ResponseEntity.ok(convertToDTO(bulletin)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BulletinDTO> createBulletin(@Valid @RequestBody BulletinCreateDTO createDTO) {
        Bulletin bulletin = new Bulletin();

        Eleve eleve = eleveRepository.findById(createDTO.eleveId())
            .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
        bulletin.setEleve(eleve);

        Classe classe = classeRepository.findById(createDTO.classeId())
            .orElseThrow(() -> new RuntimeException("Classe non trouvée"));
        bulletin.setClasse(classe);

        bulletin.setPeriode(createDTO.periode());
        bulletin.setMoyenneGenerale(createDTO.moyenneGenerale());
        bulletin.setPourcentageObtenu(createDTO.pourcentageObtenu());
        bulletin.setRangClasse(createDTO.rangClasse());
        bulletin.setNombreElevesClasse(createDTO.nombreElevesClasse());
        bulletin.setAppreciationGenerale(createDTO.appreciationGenerale());
        bulletin.setBulletinPdfPath(createDTO.bulletinPdfPath());

        Bulletin savedBulletin = bulletinRepository.save(bulletin);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedBulletin));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BulletinDTO> updateBulletin(@PathVariable Long id, @RequestBody BulletinUpdateDTO updateDTO) {
        return bulletinRepository.findById(id)
            .map(bulletin -> {
                if (updateDTO.eleveId() != null) {
                    Eleve eleve = eleveRepository.findById(updateDTO.eleveId())
                        .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
                    bulletin.setEleve(eleve);
                }

                if (updateDTO.classeId() != null) {
                    Classe classe = classeRepository.findById(updateDTO.classeId())
                        .orElseThrow(() -> new RuntimeException("Classe non trouvée"));
                    bulletin.setClasse(classe);
                }

                if (updateDTO.periode() != null) bulletin.setPeriode(updateDTO.periode());
                if (updateDTO.moyenneGenerale() != null) bulletin.setMoyenneGenerale(updateDTO.moyenneGenerale());
                if (updateDTO.pourcentageObtenu() != null) bulletin.setPourcentageObtenu(updateDTO.pourcentageObtenu());
                if (updateDTO.rangClasse() != null) bulletin.setRangClasse(updateDTO.rangClasse());
                if (updateDTO.nombreElevesClasse() != null) bulletin.setNombreElevesClasse(updateDTO.nombreElevesClasse());
                if (updateDTO.appreciationGenerale() != null) bulletin.setAppreciationGenerale(updateDTO.appreciationGenerale());
                if (updateDTO.bulletinPdfPath() != null) bulletin.setBulletinPdfPath(updateDTO.bulletinPdfPath());

                Bulletin updatedBulletin = bulletinRepository.save(bulletin);
                return ResponseEntity.ok(convertToDTO(updatedBulletin));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBulletin(@PathVariable Long id) {
        if (!bulletinRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bulletinRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private BulletinDTO convertToDTO(Bulletin bulletin) {
        return new BulletinDTO(
            bulletin.getId(),
            bulletin.getEleve() != null ? bulletin.getEleve().getId() : null,
            bulletin.getEleve() != null ? bulletin.getEleve().getNom() : null,
            bulletin.getEleve() != null ? bulletin.getEleve().getPrenom() : null,
            bulletin.getClasse() != null ? bulletin.getClasse().getId() : null,
            bulletin.getClasse() != null ? bulletin.getClasse().getNomClasse() : null,
            bulletin.getPeriode(),
            bulletin.getMoyenneGenerale(),
            bulletin.getPourcentageObtenu(),
            bulletin.getRangClasse(),
            bulletin.getNombreElevesClasse(),
            bulletin.getAppreciationGenerale(),
            bulletin.getDateGeneration(),
            bulletin.getBulletinPdfPath()
        );
    }
}
