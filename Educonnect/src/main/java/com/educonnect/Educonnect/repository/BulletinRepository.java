package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.Bulletin;
import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.entity.Classe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BulletinRepository extends JpaRepository<Bulletin, Long> {
    
    List<Bulletin> findByEleve(Eleve eleve);
    
    List<Bulletin> findByEleveId(Long eleveId);
    
    List<Bulletin> findByClasse(Classe classe);
    
    List<Bulletin> findByClasseId(Long classeId);
    
    List<Bulletin> findByPeriode(String periode);
    
    Optional<Bulletin> findByEleveIdAndPeriode(Long eleveId, String periode);
    
    List<Bulletin> findByClasseIdAndPeriode(Long classeId, String periode);
    
    @Query("SELECT b FROM Bulletin b WHERE b.classe.id = :classeId AND b.periode = :periode ORDER BY b.rangClasse ASC")
    List<Bulletin> findByClasseIdAndPeriodeOrderByRang(@Param("classeId") Long classeId, @Param("periode") String periode);
}
