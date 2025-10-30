package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "cours")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cours {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(length = 150)
    private String nom;
    
    @Column(nullable = false)
    private Integer ponderation;
    
    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;
    
    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private User enseignant;
    
    @OneToMany(mappedBy = "cours", cascade = CascadeType.ALL)
    private List<Note> notes;
    
    @OneToMany(mappedBy = "cours", cascade = CascadeType.ALL)
    private List<DetailBulletin> detailsBulletin;
}
