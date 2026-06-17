package com.placehub.config;

import com.placehub.security.CustomUserDetailsService;
import com.placehub.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/api-docs/**", "/swagger-ui.html").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Admin endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/companies").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/companies/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/companies/**").hasRole("ADMIN")
                .requestMatchers("/api/interviews/admin").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/interviews").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/interviews/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/interviews/**").hasRole("ADMIN")
                .requestMatchers("/api/notifications/admin").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/notifications").hasRole("ADMIN")
                .requestMatchers("/api/results").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/results").hasRole("ADMIN")
                .requestMatchers("/api/applications/admin").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/applications/**").hasRole("ADMIN")
                // Student endpoints
                .requestMatchers("/api/students/**").hasRole("STUDENT")
                .requestMatchers("/api/applications/student").hasRole("STUDENT")
                .requestMatchers(HttpMethod.POST, "/api/applications/**").hasRole("STUDENT")
                .requestMatchers("/api/interviews/student").hasRole("STUDENT")
                .requestMatchers("/api/notifications/student/**").hasRole("STUDENT")
                // Shared
                .requestMatchers(HttpMethod.GET, "/api/companies/**").authenticated()
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
