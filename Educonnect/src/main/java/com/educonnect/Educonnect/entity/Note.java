package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;
    
    @ManyToOne
    @JoinColumn(name = "cours_id")
    private Cours cours;
    
    @Column(length = 20)
    private String periode;
    
    @Column(name = "point_obtenu", precision = 5, scale = 2)
    private BigDecimal pointObtenu;
    
    @Column(nullable = false)
    private Integer ponderation;
    
    @Column(name = "date_saisie")
    private LocalDateTime dateSaisie;
    
    @PrePersist
    protected void onCreate() {
        dateSaisie = LocalDateTime.now();
    }
}
