package com.StudentSystem.Student_System_Api.Repository;

import com.StudentSystem.Student_System_Api.Entity.ApprovalStatus;
import com.StudentSystem.Student_System_Api.Entity.Role;
import com.StudentSystem.Student_System_Api.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByStudentId(String studentId);
    Optional<User> findByEmployeeId(String employeeId);
    Boolean existsByEmail(String email);
    
    //  Methods for admin approval
    List<User> findAllByIsApprovedFalse();
    List<User> findAllByApprovalStatus(ApprovalStatus status);
    List<User> findAllByRoleAndApprovalStatus(Role role, ApprovalStatus status);
}