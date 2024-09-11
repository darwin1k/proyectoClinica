package com.example.proyecto.Intv20.service;

import com.example.proyecto.Intv20.entity.Domicilio;
import com.example.proyecto.Intv20.entity.Odontologo;
import com.example.proyecto.Intv20.repository.OdontologoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {
    @Autowired
    OdontologoRepository odontologoRepository;

    public Odontologo registrarOdontologo(Odontologo odontologo){
        return odontologoRepository.save(odontologo);
    }

    public Optional<Odontologo> buscarById(Long id){
        return odontologoRepository.findById(id);
    }

    public Optional<Odontologo> buscarByMatricula(String matricula){
        return odontologoRepository.buscarOdontologoPorMatricula(matricula);
    }

    public void eliminarOdontologo(Long id){
        if (odontologoRepository.existsById(id)) {
            odontologoRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Odontólogo no encontrado");
        }
    }

    public List<Odontologo> listarTodos (){
        return odontologoRepository.findAll();
    }

    public Optional<Odontologo> actualizarOdontologo(Long id, Odontologo nuevoOdontologo) {
        return odontologoRepository.findById(id).map(odontologoExistente -> {
            odontologoExistente.setNombre(nuevoOdontologo.getNombre());
            odontologoExistente.setApellido(nuevoOdontologo.getApellido());
            odontologoExistente.setMatricula(nuevoOdontologo.getMatricula());
            return odontologoRepository.save(odontologoExistente);
        });
    }


}
