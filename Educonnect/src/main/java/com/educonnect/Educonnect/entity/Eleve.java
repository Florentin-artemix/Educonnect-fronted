package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "eleves")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Eleve {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(length = 100)
    private String nom;
    
    @NotBlank
    @Column(length = 100)
    private String prenom;
    
    @Column(name = "date_naissance")
    private LocalDate dateNaissance;
    
    @Column(name = "lieu_naissance", length = 150)
    private String lieuNaissance;
    
    @Column(name = "numero_permanent", unique = true, length = 20)
    private String numeroPermanent;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "statut_paiement")
    private StatutPaiement statutPaiement = StatutPaiement.NON_EN_ORDRE;
    
    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;
    
    @OneToMany(mappedBy = "eleve", cascade = CascadeType.ALL)
    private List<AdresseEleve> adresses;
    
    @OneToMany(mappedBy = "eleve", cascade = CascadeType.ALL)
    private List<ParentEleve> parentsEleves;
    
    @OneToMany(mappedBy = "eleve", cascade = CascadeType.ALL)
    private List<Note> notes;
    
    @OneToMany(mappedBy = "eleve", cascade = CascadeType.ALL)
    private List<Paiement> paiements;
    
    @OneToMany(mappedBy = "eleve", cascade = CascadeType.ALL)
    private List<Bulletin> bulletins;
    
    public enum StatutPaiement {
        EN_ORDRE,
        NON_EN_ORDRE
    }
}
