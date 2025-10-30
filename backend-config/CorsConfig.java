package com.educonnect.Educonnect.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration CORS pour permettre au frontend React d'accéder aux APIs
 * 
 * INSTRUCTIONS :
 * 1. Copiez ce fichier dans src/main/java/com/educonnect/Educonnect/config/
 * 2. Redémarrez votre application Spring Boot
 * 3. Le frontend pourra alors accéder aux APIs sans erreur CORS
 */
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:5173",  // Vite dev server
                    "http://localhost:3000",  // Create React App
                    "http://localhost:8080"   // Same origin
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // Cache preflight response for 1 hour
    }
}
