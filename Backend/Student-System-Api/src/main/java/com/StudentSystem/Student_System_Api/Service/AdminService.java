package com.StudentSystem.Student_System_Api.Service;

import com.StudentSystem.Student_System_Api.Entity.ApprovalStatus;
import com.StudentSystem.Student_System_Api.Entity.User;
import com.StudentSystem.Student_System_Api.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminService {
    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getPendingUsers() {
        return userRepository.findAllByApprovalStatus(ApprovalStatus.PENDING);
    }

    public String approveUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isEmpty()) {
            return "User not found";
        }

        User user = userOptional.get();
        user.setIsApproved(true);
        user.setApprovalStatus(ApprovalStatus.APPROVED);
        userRepository.save(user);

        return "User approved successfully";
    }

    public String rejectUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        
        if (userOptional.isEmpty()) {
            return "User not found";
        }

        User user = userOptional.get();
        user.setIsApproved(false);
        user.setApprovalStatus(ApprovalStatus.REJECTED);
        userRepository.save(user);

        return "User rejected successfully";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}