package com.StudentSystem.Student_System_Api.Controllers;

import com.StudentSystem.Student_System_Api.Entity.User;
import com.StudentSystem.Student_System_Api.Service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/pending-users")
    public ResponseEntity<List<User>> getPendingUsers() {
        List<User> pendingUsers = adminService.getPendingUsers();
        return ResponseEntity.ok(pendingUsers);
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/approve/{userId}")
    public ResponseEntity<Map<String, Object>> approveUser(@PathVariable Long userId) {
        String message = adminService.approveUser(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/reject/{userId}")
    public ResponseEntity<Map<String, Object>> rejectUser(@PathVariable Long userId) {
        String message = adminService.rejectUser(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        return ResponseEntity.ok(response);
    }
}