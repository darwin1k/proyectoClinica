package com.example.proyecto.Intv20.repository;

import com.example.proyecto.Intv20.entity.Odontologo;
import com.example.proyecto.Intv20.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query("SELECT p FROM Paciente p WHERE p.email = ?1")
    Optional<Paciente> buscarPacientePorEmail(String email);

    @Query("SELECT p FROM Paciente p WHERE p.cedula = ?1")
    Optional<Paciente> buscarPacientePorCedula(String cedula);

}
