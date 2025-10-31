package com.StudentSystem.Student_System_Api.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.StudentSystem.Student_System_Api.Service.AuthService;
import com.StudentSystem.Student_System_Api.DTO.AuthResponse;
import com.StudentSystem.Student_System_Api.DTO.LoginRequest;
import com.StudentSystem.Student_System_Api.DTO.SignupRequest; 

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ADD THIS TEST ENDPOINT
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> testConnection() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Backend is connected!");
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@Valid @RequestBody SignupRequest signUpRequest) {
        AuthResponse authResponse = authService.signUp(signUpRequest);
        
        if(authResponse.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);
        
        if(authResponse.isSuccess()) {
            return ResponseEntity.ok(authResponse);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
    }
}