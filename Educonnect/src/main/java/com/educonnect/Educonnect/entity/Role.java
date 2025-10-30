package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "nom_role", unique = true, nullable = false)
    private NomRole nomRole;
    
    public enum NomRole {
        ADMIN,
        ENSEIGNANT,
        PARENT,
        PERCEPTEUR
    }
}
