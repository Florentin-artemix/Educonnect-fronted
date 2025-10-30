package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "paiements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paiement {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;
    
    @Column(name = "montant_total", precision = 10, scale = 2)
    private BigDecimal montantTotal;
    
    @Column(name = "montant_paye", precision = 10, scale = 2)
    private BigDecimal montantPaye;
    
    @Enumerated(EnumType.STRING)
    private Trimestre trimestre;
    
    @Column(name = "date_maj")
    private LocalDateTime dateMaj;
    
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        dateMaj = LocalDateTime.now();
    }
    
    public enum Trimestre {
        T1,
        T2,
        T3
    }
}
