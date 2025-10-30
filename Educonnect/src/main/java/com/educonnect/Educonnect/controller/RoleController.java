package com.educonnect.Educonnect.controller;

import com.educonnect.Educonnect.dto.*;
import com.educonnect.Educonnect.entity.Role;
import com.educonnect.Educonnect.repository.RoleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "*")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<List<RoleDTO>> getAllRoles() {
        List<RoleDTO> roles = roleRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO> getRoleById(@PathVariable Long id) {
        return roleRepository.findById(id)
            .map(role -> ResponseEntity.ok(convertToDTO(role)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RoleDTO> createRole(@Valid @RequestBody RoleCreateDTO createDTO) {
        Role role = new Role();
        role.setNomRole(createDTO.nomRole());

        Role savedRole = roleRepository.save(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedRole));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<RoleDTO> updateRole(@PathVariable Long id, @RequestBody RoleUpdateDTO updateDTO) {
        return roleRepository.findById(id)
            .map(role -> {
                if (updateDTO.nomRole() != null) {
                    role.setNomRole(updateDTO.nomRole());
                }

                Role updatedRole = roleRepository.save(role);
                return ResponseEntity.ok(convertToDTO(updatedRole));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        if (!roleRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        roleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private RoleDTO convertToDTO(Role role) {
        return new RoleDTO(
            role.getId(),
            role.getNomRole()
        );
    }
}
