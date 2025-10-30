package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(length = 100)
    private String nom;
    
    @NotBlank
    @Column(length = 100)
    private String prenom;
    
    @Email
    @NotBlank
    @Column(unique = true, nullable = false, length = 150)
    private String email;
    
    @NotBlank
    @Column(name = "mot_de_passe", length = 255)
    private String motDePasse;
    
    @Column(name = "numero_telephone", unique = true, length = 20)
    private String numeroTelephone;
    
    @Column(length = 255)
    private String adresse;
    
    @Column(name = "date_creation")
    private LocalDateTime dateCreation;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
    
    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
    }
}
