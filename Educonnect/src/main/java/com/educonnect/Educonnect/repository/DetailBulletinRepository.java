package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.DetailBulletin;
import com.educonnect.Educonnect.entity.Bulletin;
import com.educonnect.Educonnect.entity.Cours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DetailBulletinRepository extends JpaRepository<DetailBulletin, Long> {
    
    List<DetailBulletin> findByBulletin(Bulletin bulletin);
    
    List<DetailBulletin> findByBulletinId(Long bulletinId);
    
    List<DetailBulletin> findByCours(Cours cours);
    
    List<DetailBulletin> findByCoursId(Long coursId);
    
    Optional<DetailBulletin> findByBulletinIdAndCoursId(Long bulletinId, Long coursId);
}
