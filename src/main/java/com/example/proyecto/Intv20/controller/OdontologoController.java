package com.example.proyecto.Intv20.controller;

import com.example.proyecto.Intv20.entity.Domicilio;
import com.example.proyecto.Intv20.entity.Odontologo;
import com.example.proyecto.Intv20.service.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologo")
public class OdontologoController {

    @Autowired
    OdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<Odontologo> registrarOdontologo(@RequestBody Odontologo odontologo){
        return ResponseEntity.ok(odontologoService.registrarOdontologo(odontologo));
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<List<Odontologo>> listarTodos(){
        return ResponseEntity.ok(odontologoService.listarTodos());
    }

    @GetMapping("/buscar/{id}")
    ResponseEntity<Optional<Odontologo>> buscarById(@PathVariable Long id){
        Optional<Odontologo> odontologo = odontologoService.buscarById(id);
        if(odontologo.isPresent()){
            return ResponseEntity.ok(odontologo);
        }else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/buscarMatricula/{matricula}")
    ResponseEntity<Optional<Odontologo>> buscarByMatricula(@PathVariable String matricula){
        Optional<Odontologo> odontologo = odontologoService.buscarByMatricula(matricula);
        if(odontologo.isPresent()){
            return ResponseEntity.ok(odontologo);
        }else {
            return ResponseEntity.status(404).build();
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Optional<Void>> eliminarById(@PathVariable Long id){
        Optional<Odontologo> odontologo = odontologoService.buscarById(id);
        if(odontologo.isPresent()){
            odontologoService.eliminarOdontologo(id);
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.status(404).build();
        }

    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Optional<Odontologo>> actualizar(@PathVariable Long id, @RequestBody Odontologo odontologo){
        return ResponseEntity.ok(odontologoService.actualizarOdontologo(id,odontologo));
    }


}
