package com.example.proyecto.Intv20.controller;

import com.example.proyecto.Intv20.entity.Odontologo;
import com.example.proyecto.Intv20.entity.Paciente;
import com.example.proyecto.Intv20.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/paciente")
public class PacienteController {

    @Autowired
    PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<Paciente> registrarPaciente(@RequestBody Paciente paciente) {
        return ResponseEntity.ok(pacienteService.registrarPaciente(paciente));

    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Paciente>> buscarPacienteId(@PathVariable Long id){
        return ResponseEntity.ok(pacienteService.buscarPacienteID(id));
    }

    @GetMapping("/buscarEmail/{email}")
    ResponseEntity<Optional<Paciente>> buscarByEmail(@PathVariable String email){
        Optional<Paciente> paciente  = pacienteService.buscarByEmail(email);
        if(paciente.isPresent()){
            return ResponseEntity.ok(paciente);
        }else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<List<Paciente>> listarTodosPacientes(){
        return ResponseEntity.ok(pacienteService.listarTodos());
    }

    @GetMapping("/eliminar/{id}")
    public void eliminarbyId(@PathVariable Long id){
        pacienteService.eliminarPacienteId(id);
    }

    @GetMapping("/actualizar/{id}")
    public ResponseEntity<Optional<Paciente>> actualizar(@PathVariable Long id, Paciente paciente){
        return ResponseEntity.ok(pacienteService.actualizarPaciente(id,paciente));
    }
}
