package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.Cours;
import com.educonnect.Educonnect.entity.Classe;
import com.educonnect.Educonnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursRepository extends JpaRepository<Cours, Long> {
    
    List<Cours> findByClasse(Classe classe);
    
    List<Cours> findByClasseId(Long classeId);
    
    List<Cours> findByEnseignant(User enseignant);
    
    List<Cours> findByEnseignantId(Long enseignantId);
    
    List<Cours> findByNomContainingIgnoreCase(String nom);
}
