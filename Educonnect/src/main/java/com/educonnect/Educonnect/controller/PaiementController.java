package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.Paiement;
import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.repository.PaiementRepository;
import com.educonnect.Educonnect.repository.EleveRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/paiements")
@CrossOrigin(origins = "*")
public class PaiementController {

    @Autowired
    private PaiementRepository paiementRepository;

    @Autowired
    private EleveRepository eleveRepository;

    @GetMapping
    public ResponseEntity<List<PaiementDTO>> getAllPaiements() {
        List<PaiementDTO> paiements = paiementRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(paiements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaiementDTO> getPaiementById(@PathVariable Long id) {
        return paiementRepository.findById(id)
            .map(paiement -> ResponseEntity.ok(convertToDTO(paiement)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PaiementDTO> createPaiement(@Valid @RequestBody PaiementCreateDTO createDTO) {
        Paiement paiement = new Paiement();

        Eleve eleve = eleveRepository.findById(createDTO.eleveId())
            .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
        paiement.setEleve(eleve);

        paiement.setMontantTotal(createDTO.montantTotal());
        paiement.setMontantPaye(createDTO.montantPaye());
        paiement.setTrimestre(createDTO.trimestre());

        Paiement savedPaiement = paiementRepository.save(paiement);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedPaiement));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PaiementDTO> updatePaiement(@PathVariable Long id, @RequestBody PaiementUpdateDTO updateDTO) {
        return paiementRepository.findById(id)
            .map(paiement -> {
                if (updateDTO.eleveId() != null) {
                    Eleve eleve = eleveRepository.findById(updateDTO.eleveId())
                        .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
                    paiement.setEleve(eleve);
                }

                if (updateDTO.montantTotal() != null) paiement.setMontantTotal(updateDTO.montantTotal());
                if (updateDTO.montantPaye() != null) paiement.setMontantPaye(updateDTO.montantPaye());
                if (updateDTO.trimestre() != null) paiement.setTrimestre(updateDTO.trimestre());

                Paiement updatedPaiement = paiementRepository.save(paiement);
                return ResponseEntity.ok(convertToDTO(updatedPaiement));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaiement(@PathVariable Long id) {
        if (!paiementRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        paiementRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private PaiementDTO convertToDTO(Paiement paiement) {
        BigDecimal montantRestant = paiement.getMontantTotal() != null && paiement.getMontantPaye() != null
            ? paiement.getMontantTotal().subtract(paiement.getMontantPaye())
            : BigDecimal.ZERO;

        return new PaiementDTO(
            paiement.getId(),
            paiement.getEleve() != null ? paiement.getEleve().getId() : null,
            paiement.getEleve() != null ? paiement.getEleve().getNom() : null,
            paiement.getEleve() != null ? paiement.getEleve().getPrenom() : null,
            paiement.getMontantTotal(),
            paiement.getMontantPaye(),
            montantRestant,
            paiement.getTrimestre(),
            paiement.getDateMaj()
        );
    }
}
