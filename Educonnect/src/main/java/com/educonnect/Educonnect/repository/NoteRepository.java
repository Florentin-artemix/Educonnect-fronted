package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.Note;
import com.educonnect.Educonnect.entity.Eleve;
import com.educonnect.Educonnect.entity.Cours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    
    List<Note> findByEleve(Eleve eleve);
    
    List<Note> findByEleveId(Long eleveId);
    
    List<Note> findByCours(Cours cours);
    
    List<Note> findByCoursId(Long coursId);
    
    List<Note> findByEleveIdAndPeriode(Long eleveId, String periode);
    
    List<Note> findByCoursIdAndPeriode(Long coursId, String periode);
    
    Optional<Note> findByEleveIdAndCoursIdAndPeriode(Long eleveId, Long coursId, String periode);
    
    @Query("SELECT n FROM Note n WHERE n.eleve.classe.id = :classeId AND n.periode = :periode")
    List<Note> findByClasseIdAndPeriode(@Param("classeId") Long classeId, @Param("periode") String periode);
}
