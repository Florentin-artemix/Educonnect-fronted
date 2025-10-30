package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.Paiement;
import com.educonnect.Educonnect.entity.Eleve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    
    List<Paiement> findByEleve(Eleve eleve);
    
    List<Paiement> findByEleveId(Long eleveId);
    
    List<Paiement> findByTrimestre(Paiement.Trimestre trimestre);
    
    Optional<Paiement> findByEleveIdAndTrimestre(Long eleveId, Paiement.Trimestre trimestre);
    
    @Query("SELECT p FROM Paiement p WHERE p.eleve.classe.id = :classeId")
    List<Paiement> findByClasseId(@Param("classeId") Long classeId);
    
    @Query("SELECT SUM(p.montantPaye) FROM Paiement p WHERE p.eleve.id = :eleveId")
    BigDecimal getTotalPaiementsByEleveId(@Param("eleveId") Long eleveId);
}
