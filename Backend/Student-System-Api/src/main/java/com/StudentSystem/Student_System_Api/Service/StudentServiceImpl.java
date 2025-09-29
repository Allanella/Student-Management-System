package com.StudentSystem.Student_System_Api.Service;

import com.StudentSystem.Student_System_Api.Entity.Student;
import com.StudentSystem.Student_System_Api.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService{


    @Autowired
    private StudentRepository studentRepository;
    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
   public Student login( String email, String password){
       Optional<Student> studentOpt = studentRepository.findByEmail(email);

       if(studentOpt.isPresent()){
           Student student = studentOpt.get();
           if(student.getPassword().equals(password)){
               return student;
           }
       }
      return null;

   }

}
