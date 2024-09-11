package com.example.proyecto.Intv20.controller;


import com.example.proyecto.Intv20.entity.Domicilio;
import com.example.proyecto.Intv20.service.DomicilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/domicilio")

public class DomicilioController {
    @Autowired
    DomicilioService domicilioService;

    @PostMapping
    public ResponseEntity <Domicilio> registrarDomicilio(@RequestBody Domicilio domicilio){

        return ResponseEntity.ok(domicilioService.registrarDomicilio(domicilio));
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Domicilio>> buscarDomicilioId(@PathVariable Long id){
        return ResponseEntity.ok(domicilioService.buscarById(id));
    }

    @GetMapping("/eliminar/{id}")
    public void eliminarById(@PathVariable Long id){
        domicilioService.eliminarById(id);
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<List<Domicilio>> listarTodos(){
        return ResponseEntity.ok(domicilioService.listarTodos());
    }

    @GetMapping("/actualizar/{id}")
    public ResponseEntity<Optional<Domicilio>> actualizar(@PathVariable Long id, Domicilio domicilio){
        return ResponseEntity.ok(domicilioService.actualizarDomicilio(id,domicilio));
    }
}
