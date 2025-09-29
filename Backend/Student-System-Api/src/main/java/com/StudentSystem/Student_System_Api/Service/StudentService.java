package com.StudentSystem.Student_System_Api.Service;

import com.StudentSystem.Student_System_Api.Entity.Student;

import java.util.List;

public interface StudentService {

    public Student saveStudent(Student student);

    List<Student> getAllStudents();

    Student login( String email, String password);
}
