package com.educonnect.Educonnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "parents_eleves")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParentEleve {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;
    
    @ManyToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;
}
