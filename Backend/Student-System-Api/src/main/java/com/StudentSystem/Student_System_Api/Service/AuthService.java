package com.StudentSystem.Student_System_Api.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.StudentSystem.Student_System_Api.Config.JwtUtil;
import com.StudentSystem.Student_System_Api.DTO.AuthResponse;
import com.StudentSystem.Student_System_Api.DTO.LoginRequest;
import com.StudentSystem.Student_System_Api.DTO.SignupRequest;
import com.StudentSystem.Student_System_Api.Entity.ApprovalStatus;
import com.StudentSystem.Student_System_Api.Entity.Role;
import com.StudentSystem.Student_System_Api.Entity.User;
import com.StudentSystem.Student_System_Api.Repository.UserRepository;

import java.util.Optional;

@Service
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse signUp(SignupRequest signupRequest) {
        // Check if user already exists
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Email is already in use")
                    .build();
        }

        // Validate passwords match
        if (!signupRequest.getPassword().equals(signupRequest.getConfirmPassword())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Passwords do not match")
                    .build();
        }

        // Determine if user needs approval (Students and Teachers need approval, Admin doesn't)
        boolean needsApproval = signupRequest.getRole() == Role.STUDENT || 
                               signupRequest.getRole() == Role.TEACHER;

        // Create new user
        User user = User.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .fullName(signupRequest.getFullName())
                .role(signupRequest.getRole())
                .studentId(signupRequest.getStudentId())
                .employeeId(signupRequest.getEmployeeId())
                .isActive(true)
                .isApproved(!needsApproval) // Auto-approve Admin, others need approval
                .approvalStatus(needsApproval ? ApprovalStatus.PENDING : ApprovalStatus.APPROVED)
                .build();

        User savedUser = userRepository.save(user);

        String message = needsApproval 
            ? "Account created successfully! Please wait for admin approval." 
            : "Account created successfully!";

        return AuthResponse.builder()
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole())
                .isApproved(savedUser.getIsApproved())
                .approvalStatus(savedUser.getApprovalStatus())
                .success(true)
                .message(message)
                .build();
    }

    public AuthResponse login(LoginRequest loginRequest) {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        
        if (userOptional.isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
        }

        User user = userOptional.get();

        // Check if account is active
        if (!user.getIsActive()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Account is inactive")
                    .build();
        }

        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build();
        }

        // NEW: Check if account is approved
        if (!user.getIsApproved()) {
            String statusMessage = switch (user.getApprovalStatus()) {
                case PENDING -> "Your account is pending admin approval. Please wait.";
                case REJECTED -> "Your account has been rejected. Please contact admin.";
                default -> "Your account is not approved yet.";
            };
            
            return AuthResponse.builder()
                    .success(false)
                    .message(statusMessage)
                    .isApproved(false)
                    .approvalStatus(user.getApprovalStatus())
                    .build();
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getId());

        return AuthResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .token(token)
                .isApproved(user.getIsApproved())
                .approvalStatus(user.getApprovalStatus())
                .success(true)
                .message("Login successful")
                .build();
    }
}