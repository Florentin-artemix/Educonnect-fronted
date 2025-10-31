package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.User;
import com.educonnect.Educonnect.entity.Role;
import com.educonnect.Educonnect.repository.UserRepository;
import com.educonnect.Educonnect.repository.RoleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(user -> ResponseEntity.ok(convertToDTO(user)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserCreateDTO createDTO) {
        if (userRepository.existsByEmail(createDTO.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        User user = new User();
        user.setNom(createDTO.nom());
        user.setPrenom(createDTO.prenom());
        user.setEmail(createDTO.email());
        user.setMotDePasse(createDTO.motDePasse()); // TODO: Encoder le mot de passe
        user.setNumeroTelephone(createDTO.numeroTelephone());
        user.setAdresse(createDTO.adresse());

        // Traiter les rôles par leurs noms
        if (createDTO.roles() != null && !createDTO.roles().isEmpty()) {
            Set<Role> roles = new HashSet<>();
            for (String roleName : createDTO.roles()) {
                try {
                    Role.NomRole nomRole = Role.NomRole.valueOf(roleName.toUpperCase());
                    roleRepository.findByNomRole(nomRole).ifPresent(roles::add);
                } catch (IllegalArgumentException e) {
                    System.err.println("Rôle invalide ignoré : " + roleName);
                }
            }
            user.setRoles(roles);
        }

        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedUser));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO updateDTO) {
        return userRepository.findById(id)
            .map(user -> {
                if (updateDTO.nom() != null) user.setNom(updateDTO.nom());
                if (updateDTO.prenom() != null) user.setPrenom(updateDTO.prenom());
                if (updateDTO.email() != null) user.setEmail(updateDTO.email());
                if (updateDTO.motDePasse() != null && !updateDTO.motDePasse().trim().isEmpty()) {
                    user.setMotDePasse(updateDTO.motDePasse()); // TODO: Encoder le mot de passe
                }
                if (updateDTO.numeroTelephone() != null) user.setNumeroTelephone(updateDTO.numeroTelephone());
                if (updateDTO.adresse() != null) user.setAdresse(updateDTO.adresse());
                
                // Traiter les rôles par leurs noms
                if (updateDTO.roles() != null) {
                    Set<Role> roles = new HashSet<>();
                    for (String roleName : updateDTO.roles()) {
                        try {
                            Role.NomRole nomRole = Role.NomRole.valueOf(roleName.toUpperCase());
                            roleRepository.findByNomRole(nomRole).ifPresent(roles::add);
                        } catch (IllegalArgumentException e) {
                            System.err.println("Rôle invalide ignoré : " + roleName);
                        }
                    }
                    user.setRoles(roles);
                }

                User updatedUser = userRepository.save(user);
                return ResponseEntity.ok(convertToDTO(updatedUser));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private UserDTO convertToDTO(User user) {
        Set<Role.NomRole> roleNames = user.getRoles() != null 
            ? user.getRoles().stream()
                .map(Role::getNomRole)
                .collect(Collectors.toSet())
            : new HashSet<>();

        return new UserDTO(
            user.getId(),
            user.getNom(),
            user.getPrenom(),
            user.getEmail(),
            user.getNumeroTelephone(),
            user.getAdresse(),
            roleNames,
            user.getDateCreation()
        );
    }
}
