package com.StudentSystem.Student_System_Api.DTO;

import jakarta.validation.constraints.*;
import lombok.*;
import com.StudentSystem.Student_System_Api.Entity.Role;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    @NotNull(message = "Role is required")
    private Role role;

    private String studentId;
    private String employeeId;
}