package com.educonnect.Educonnect.repository;

import com.educonnect.Educonnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByNumeroTelephone(String numeroTelephone);
    
    boolean existsByEmail(String email);
    
    boolean existsByNumeroTelephone(String numeroTelephone);
}
