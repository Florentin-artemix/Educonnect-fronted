package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.AdresseEleve;
import com.educonnect.Educonnect.entity.Eleve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdresseEleveRepository extends JpaRepository<AdresseEleve, Long> {
    
    List<AdresseEleve> findByEleve(Eleve eleve);
    
    List<AdresseEleve> findByEleveId(Long eleveId);
    
    List<AdresseEleve> findByVille(String ville);
    
    List<AdresseEleve> findByCommuneTerritoire(String communeTerritoire);
}
