package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.entity.Classe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EleveRepository extends JpaRepository<Eleve, Long> {
    
    Optional<Eleve> findByNumeroPermanent(String numeroPermanent);
    
    List<Eleve> findByClasse(Classe classe);
    
    List<Eleve> findByClasseId(Long classeId);
    
    List<Eleve> findByStatutPaiement(Eleve.StatutPaiement statutPaiement);
    
    List<Eleve> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String nom, String prenom);
    
    boolean existsByNumeroPermanent(String numeroPermanent);
    
    long countByClasseId(Long classeId);
}
