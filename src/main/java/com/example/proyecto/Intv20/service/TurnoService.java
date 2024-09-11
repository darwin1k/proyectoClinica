package com.example.proyecto.Intv20.service;

import com.example.proyecto.Intv20.entity.Paciente;
import com.example.proyecto.Intv20.entity.Turno;
import com.example.proyecto.Intv20.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class TurnoService {
    @Autowired
    TurnoRepository turnoRepository;

    public Turno registrarTurno(Turno turno){
        return turnoRepository.save(turno);
    }

    public Optional<Turno> buscarById(Long id){
        return turnoRepository.findById(id);
    }

    public void eliminarTurnoId(Long id){
        turnoRepository.deleteById(id);
    }

    public List<Turno> listarTodos(){
        return turnoRepository.findAll();
    }
    public Optional<Turno> actualizarTurno(Long id, Turno nuevoTurno) {
        return turnoRepository.findById(id).map(turnoExistente -> {
            turnoExistente.setPaciente(nuevoTurno.getPaciente());
            turnoExistente.setOdontologo(nuevoTurno.getOdontologo());
            turnoExistente.setFecha(nuevoTurno.getFecha());
            return turnoRepository.save(turnoExistente);
        });
    }
}
