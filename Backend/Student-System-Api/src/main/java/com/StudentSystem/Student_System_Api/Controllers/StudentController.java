package com.StudentSystem.Student_System_Api.Controllers;

import com.StudentSystem.Student_System_Api.Entity.Student;
import com.StudentSystem.Student_System_Api.Repository.StudentRepository;
import com.StudentSystem.Student_System_Api.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // allow requests from your frontend
public class StudentController {

    @Autowired
    private StudentService studentService;

    //Get all students
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Student Sign up
    @PostMapping("/students")
    
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

// .........alternative to the method above
//    @PostMapping("/students")
//    Student student (@RequestBody Student student){
//        return studentRepository.save(student);
//    }




//   @PostMapping("/login")

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student loginRequest) {
        Student student = studentService.login( loginRequest.getEmail(), loginRequest.getPassword());

        if (student != null) {
            student.setPassword(null); // ✅ Don't return password
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }





}