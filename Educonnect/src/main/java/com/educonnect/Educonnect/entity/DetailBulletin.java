package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "details_bulletin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailBulletin {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "bulletin_id")
    private Bulletin bulletin;
    
    @ManyToOne
    @JoinColumn(name = "cours_id")
    private Cours cours;
    
    @ManyToOne
    @JoinColumn(name = "note_id")
    private Note note;
    
    @Column(name = "note_obtenue", precision = 5, scale = 2)
    private BigDecimal noteObtenue;
    
    @Column(nullable = false)
    private Integer ponderation;
    
    @Column(name = "moyenne_ponderee", precision = 5, scale = 2)
    private BigDecimal moyennePonderee;
}
