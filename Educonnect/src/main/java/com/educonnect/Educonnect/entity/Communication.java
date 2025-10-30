package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "communications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Communication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "expediteur_id")
    private User expediteur;
    
    @ManyToOne
    @JoinColumn(name = "destinataire_id")
    private User destinataire;
    
    @Column(length = 255)
    private String sujet;
    
    @Column(columnDefinition = "TEXT")
    private String contenu;
    
    @Enumerated(EnumType.STRING)
    private TypeCommunication type;
    
    @Column(name = "date_envoi")
    private LocalDateTime dateEnvoi;
    
    @PrePersist
    protected void onCreate() {
        dateEnvoi = LocalDateTime.now();
    }
    
    public enum TypeCommunication {
        OFFICIEL,
        PARENT,
        ENSEIGNANT
    }
}
