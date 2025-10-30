package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.Communication;
import com.educonnect.Educonnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunicationRepository extends JpaRepository<Communication, Long> {
    
    List<Communication> findByExpediteur(User expediteur);
    
    List<Communication> findByExpediteurId(Long expediteurId);
    
    List<Communication> findByDestinataire(User destinataire);
    
    List<Communication> findByDestinataireId(Long destinataireId);
    
    List<Communication> findByType(Communication.TypeCommunication type);
    
    @Query("SELECT c FROM Communication c WHERE c.expediteur.id = :userId OR c.destinataire.id = :userId ORDER BY c.dateEnvoi DESC")
    List<Communication> findAllByUserId(@Param("userId") Long userId);
    
    @Query("SELECT c FROM Communication c WHERE c.destinataire.id = :userId ORDER BY c.dateEnvoi DESC")
    List<Communication> findReceivedByUserId(@Param("userId") Long userId);
    
    @Query("SELECT c FROM Communication c WHERE c.expediteur.id = :userId ORDER BY c.dateEnvoi DESC")
    List<Communication> findSentByUserId(@Param("userId") Long userId);
}
