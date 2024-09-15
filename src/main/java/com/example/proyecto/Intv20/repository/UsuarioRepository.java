package com.example.proyecto.Intv20.repository;

import com.example.proyecto.Intv20.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Optional<Usuario> findByEmail(String correo);
}
