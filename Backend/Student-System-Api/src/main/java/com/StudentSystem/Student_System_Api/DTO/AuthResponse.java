package com.StudentSystem.Student_System_Api.DTO;

import com.StudentSystem.Student_System_Api.Entity.ApprovalStatus;
import com.StudentSystem.Student_System_Api.Entity.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private Long userId;
    private String email;
    private String fullName;
    private Role role;
    private String token;
    private Boolean isApproved;  
    private ApprovalStatus approvalStatus;  
    private String message;
    private boolean success;
}