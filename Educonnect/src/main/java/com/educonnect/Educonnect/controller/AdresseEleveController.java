package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.AdresseEleve;
import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.repository.AdresseEleveRepository;
import com.educonnect.Educonnect.repository.EleveRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/adresses-eleves")
@CrossOrigin(origins = "*")
public class AdresseEleveController {

    @Autowired
    private AdresseEleveRepository adresseEleveRepository;

    @Autowired
    private EleveRepository eleveRepository;

    @GetMapping
    public ResponseEntity<List<AdresseEleveDTO>> getAllAdressesEleves() {
        List<AdresseEleveDTO> adresses = adresseEleveRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(adresses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdresseEleveDTO> getAdresseEleveById(@PathVariable Long id) {
        return adresseEleveRepository.findById(id)
            .map(adresse -> ResponseEntity.ok(convertToDTO(adresse)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AdresseEleveDTO> createAdresseEleve(@Valid @RequestBody AdresseEleveCreateDTO createDTO) {
        AdresseEleve adresse = new AdresseEleve();
        adresse.setVille(createDTO.ville());
        adresse.setCommuneTerritoire(createDTO.communeTerritoire());
        adresse.setEcole(createDTO.ecole());
        adresse.setCode(createDTO.code());

        Eleve eleve = eleveRepository.findById(createDTO.eleveId())
            .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
        adresse.setEleve(eleve);

        AdresseEleve savedAdresse = adresseEleveRepository.save(adresse);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedAdresse));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AdresseEleveDTO> updateAdresseEleve(@PathVariable Long id, @RequestBody AdresseEleveUpdateDTO updateDTO) {
        return adresseEleveRepository.findById(id)
            .map(adresse -> {
                if (updateDTO.ville() != null) adresse.setVille(updateDTO.ville());
                if (updateDTO.communeTerritoire() != null) adresse.setCommuneTerritoire(updateDTO.communeTerritoire());
                if (updateDTO.ecole() != null) adresse.setEcole(updateDTO.ecole());
                if (updateDTO.code() != null) adresse.setCode(updateDTO.code());
                
                if (updateDTO.eleveId() != null) {
                    Eleve eleve = eleveRepository.findById(updateDTO.eleveId())
                        .orElseThrow(() -> new RuntimeException("Élève non trouvé"));
                    adresse.setEleve(eleve);
                }

                AdresseEleve updatedAdresse = adresseEleveRepository.save(adresse);
                return ResponseEntity.ok(convertToDTO(updatedAdresse));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdresseEleve(@PathVariable Long id) {
        if (!adresseEleveRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        adresseEleveRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private AdresseEleveDTO convertToDTO(AdresseEleve adresse) {
        return new AdresseEleveDTO(
            adresse.getId(),
            adresse.getVille(),
            adresse.getCommuneTerritoire(),
            adresse.getEcole(),
            adresse.getCode(),
            adresse.getEleve() != null ? adresse.getEleve().getId() : null,
            adresse.getEleve() != null ? 
                adresse.getEleve().getNom() + " " + adresse.getEleve().getPrenom() : null
        );
    }
}
