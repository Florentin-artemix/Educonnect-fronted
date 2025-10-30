package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.ParentEleve;
import com.educonnect.Educonnect.entity.User;
import com.educonnect.Educonnect.entity.Eleve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParentEleveRepository extends JpaRepository<ParentEleve, Long> {
    
    List<ParentEleve> findByParent(User parent);
    
    List<ParentEleve> findByParentId(Long parentId);
    
    List<ParentEleve> findByEleve(Eleve eleve);
    
    List<ParentEleve> findByEleveId(Long eleveId);
    
    boolean existsByParentIdAndEleveId(Long parentId, Long eleveId);
}
