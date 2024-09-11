package com.example.proyecto.Intv20.service;

import com.example.proyecto.Intv20.entity.Odontologo;
import com.example.proyecto.Intv20.entity.Paciente;
import com.example.proyecto.Intv20.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    PacienteRepository pacienteRepository;

    public Paciente registrarPaciente(Paciente paciente){
        return pacienteRepository.save(paciente);
    }

    public Optional<Paciente> buscarPacienteID(Long id){
        return pacienteRepository.findById(id);
    }

    public Optional<Paciente> buscarByEmail(String email){
        return pacienteRepository.buscarPacientePorEmail(email);
    }

    public void eliminarPacienteId(Long id){
        pacienteRepository.deleteById(id);
    }

    public List<Paciente> listarTodos(){
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> actualizarPaciente(Long id, Paciente nuevoPaciente) {
        return pacienteRepository.findById(id).map(pacienteExistente -> {
            pacienteExistente.setNombre(nuevoPaciente.getNombre());
            pacienteExistente.setApellido(nuevoPaciente.getApellido());
            pacienteExistente.setCedula(nuevoPaciente.getCedula());
            pacienteExistente.setFechaIngreso(nuevoPaciente.getFechaIngreso());
            pacienteExistente.setEmail(nuevoPaciente.getEmail());
            return pacienteRepository.save(pacienteExistente);
        });
    }

}
