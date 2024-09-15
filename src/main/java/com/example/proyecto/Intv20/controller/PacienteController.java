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

    @GetMapping("/buscarCedula/{cedula}")
    ResponseEntity<Optional<Paciente>> buscarByCedula(@PathVariable String cedula){
        Optional<Paciente> paciente  = pacienteService.buscarByCedula(cedula);
        if(paciente.isPresent()){
            return ResponseEntity.ok(paciente);
        }else {
            return ResponseEntity.status(404).build();
        }
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

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Optional<Void>> eliminarbyId(@PathVariable Long id){
        Optional<Paciente> paciente = pacienteService.buscarPacienteID(id);
        if(paciente.isPresent()){
            pacienteService.eliminarPacienteId(id);
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.status(404).build();
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Optional<Paciente>> actualizar(@PathVariable Long id, Paciente paciente){
        return ResponseEntity.ok(pacienteService.actualizarPaciente(id,paciente));
    }
}
