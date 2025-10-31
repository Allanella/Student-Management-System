package com.StudentSystem.Student_System_Api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.StudentSystem.Student_System_Api.Entity")
@EnableJpaRepositories(basePackages = "com.StudentSystem.Student_System_Api.Repository")
public class EduPortal {
    public static void main(String[] args) {
        SpringApplication.run(EduPortal.class, args);
    }
}