package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "classes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Classe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(name = "nom_classe", length = 50)
    private String nomClasse;
    
    @Column(name = "annee_scolaire", length = 10)
    private String anneeScolaire;
    
    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private User enseignant;
    
    @OneToMany(mappedBy = "classe", cascade = CascadeType.ALL)
    private List<Eleve> eleves;
    
    @OneToMany(mappedBy = "classe", cascade = CascadeType.ALL)
    private List<Cours> cours;
    
    @OneToMany(mappedBy = "classe", cascade = CascadeType.ALL)
    private List<Bulletin> bulletins;
}
