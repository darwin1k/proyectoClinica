package com.example.proyecto.Intv20.Security;

import com.example.proyecto.Intv20.entity.Usuario;
import com.example.proyecto.Intv20.entity.UsuarioRole;
import com.example.proyecto.Intv20.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatosIniciales implements ApplicationRunner {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        String passCifrado= bCryptPasswordEncoder.encode("admin");
        Usuario usuario= new Usuario("darwin","admin",passCifrado,"darwin.cardemil@gmail.com", UsuarioRole.ROLE_USER);
        System.out.println("pass: "+passCifrado);
        usuarioRepository.save(usuario);

    }
}
