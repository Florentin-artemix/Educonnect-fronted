package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bulletins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bulletin {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;
    
    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;
    
    @Column(length = 20)
    private String periode;
    
    @Column(name = "moyenne_generale", precision = 5, scale = 2)
    private BigDecimal moyenneGenerale;
    
    @Column(name = "pourcentage_obtenu", precision = 5, scale = 2)
    private BigDecimal pourcentageObtenu;
    
    @Column(name = "rang_classe")
    private Integer rangClasse;
    
    @Column(name = "nombre_eleves_classe")
    private Integer nombreElevesClasse;
    
    @Column(name = "appreciation_generale", columnDefinition = "TEXT")
    private String appreciationGenerale;
    
    @Column(name = "date_generation")
    private LocalDateTime dateGeneration;
    
    @Column(name = "bulletin_pdf_path", length = 255)
    private String bulletinPdfPath;
    
    @OneToMany(mappedBy = "bulletin", cascade = CascadeType.ALL)
    private List<DetailBulletin> detailsBulletin;
    
    @PrePersist
    protected void onCreate() {
        dateGeneration = LocalDateTime.now();
    }
}
