package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "adresses_eleves")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdresseEleve {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 100)
    private String ville;
    
    @Column(name = "commune_territoire", length = 100)
    private String communeTerritoire;
    
    @Column(length = 150)
    private String ecole;
    
    @Column(length = 20)
    private String code;
    
    @ManyToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;
}
