package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.Classe;
import com.educonnect.Educonnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long> {
    
    List<Classe> findByAnneeScolaire(String anneeScolaire);
    
    List<Classe> findByEnseignant(User enseignant);
    
    List<Classe> findByEnseignantId(Long enseignantId);
    
    List<Classe> findByNomClasseContainingIgnoreCase(String nomClasse);
}
