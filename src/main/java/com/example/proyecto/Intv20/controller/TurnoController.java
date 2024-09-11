package com.example.proyecto.Intv20.controller;

import com.example.proyecto.Intv20.entity.Odontologo;
import com.example.proyecto.Intv20.entity.Paciente;
import com.example.proyecto.Intv20.entity.Turno;
import com.example.proyecto.Intv20.service.OdontologoService;
import com.example.proyecto.Intv20.service.PacienteService;
import com.example.proyecto.Intv20.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turno")
public class TurnoController {

    @Autowired
    TurnoService turnoService;
    @Autowired
    PacienteService pacienteService;
    @Autowired
    OdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<Turno> registrarTurno(@RequestBody Turno turno) {
        Optional<Paciente> pacienteBuscado= pacienteService.buscarPacienteID(turno.getPaciente().getId());
        Optional<Odontologo> odontologoBuscado= odontologoService.buscarById(turno.getOdontologo().getId());
        if(pacienteBuscado.isPresent() && odontologoBuscado.isPresent()){
            turno.setPaciente(pacienteBuscado.get());
            turno.setOdontologo(odontologoBuscado.get());
            return ResponseEntity.ok(turnoService.registrarTurno(turno)); //si el retorno es correcto , seria un 200
        }else{
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Turno>> buscarTurnoId(@PathVariable Long id){
        return ResponseEntity.ok(turnoService.buscarById(id));
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<List<Turno>> listarTodosTurnos(){
        return ResponseEntity.ok(turnoService.listarTodos());
    }

    @GetMapping("/eliminar/{id}")
    public void eliminarbyId(@PathVariable Long id){
        turnoService.eliminarTurnoId(id);
    }

    @GetMapping("/actualizar/{id}")
    public ResponseEntity<Optional<Turno>> actualizar(@PathVariable Long id, Turno turno){
        return ResponseEntity.ok(turnoService.actualizarTurno(id,turno));
    }
}
