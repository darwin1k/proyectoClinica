package com.example.proyecto.Intv20.service;

import com.example.proyecto.Intv20.entity.Domicilio;
import com.example.proyecto.Intv20.repository.DomicilioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DomicilioService {

    @Autowired
    DomicilioRepository domicilioRepository;

    public Domicilio registrarDomicilio(Domicilio domicilio){
        return domicilioRepository.save(domicilio);
    }

    public Optional<Domicilio> buscarById(Long id){
        return domicilioRepository.findById(id);
    }

    public void eliminarById(Long id){
        domicilioRepository.deleteById(id);
    }

    public List<Domicilio> listarTodos(){
        return domicilioRepository.findAll();
    }

    public Optional<Domicilio> actualizarDomicilio(Long id, Domicilio nuevoDomicilio) {
        return domicilioRepository.findById(id).map(domicilioExistente -> {
            domicilioExistente.setCalle(nuevoDomicilio.getCalle());
            domicilioExistente.setNumero(nuevoDomicilio.getNumero());
            domicilioExistente.setLocalidad(nuevoDomicilio.getLocalidad());
            domicilioExistente.setProvincia(nuevoDomicilio.getProvincia());
            return domicilioRepository.save(domicilioExistente);
        });
    }
}
