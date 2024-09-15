package com.example.proyecto.Intv20.Security;

import com.example.proyecto.Intv20.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity //<-- activa la seguridad.
public class WebConfigSecurity {
    //esta clase deberia autenticar y autorizar
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Bean //el metodo que nos va a ayudar con la autenticacion
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider= new DaoAuthenticationProvider();
        provider.setUserDetailsService(usuarioService);
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        return provider;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authz)-> authz
                        .requestMatchers("/index.html").hasRole("USER")
                        .requestMatchers("/post_odontologos.html").permitAll()
                        .anyRequest().authenticated())
                .formLogin(withDefaults()).logout(withDefaults());
        return http.build();

    }

}
