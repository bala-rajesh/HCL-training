package com.studentrecords.service;

import com.studentrecords.model.Student;
import com.studentrecords.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    /**
     * Calculate total marks and assign grade based on average
     * Grade A: Average >= 80
     * Grade B: Average 60-79
     * Grade C: Average < 60
     */
    private void calculateTotalAndGrade(Student student) {
        // Calculate total
        int total = student.getSubject1() + student.getSubject2() + student.getSubject3();
        student.setTotal(total);

        // Calculate average
        double average = total / 3.0;

        // Assign grade
        String grade;
        if (average >= 80) {
            grade = "A";
        } else if (average >= 60) {
            grade = "B";
        } else {
            grade = "C";
        }
        student.setGrade(grade);
    }

    /**
     * Create a new student record
     */
    public Student createStudent(Student student) {
        if (student == null) {
            throw new IllegalArgumentException("Student cannot be null");
        }
        calculateTotalAndGrade(student);
        return studentRepository.save(student);
    }

    /**
     * Get all students
     */
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Get student by ID
     */
    public Optional<Student> getStudentById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Student ID cannot be null");
        }
        return studentRepository.findById(id);
    }

    /**
     * Update an existing student record
     */
    public Student updateStudent(Long id, Student studentDetails) {
        if (id == null) {
            throw new IllegalArgumentException("Student ID cannot be null");
        }
        if (studentDetails == null) {
            throw new IllegalArgumentException("Student details cannot be null");
        }

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        student.setName(studentDetails.getName());
        student.setSubject1(studentDetails.getSubject1());
        student.setSubject2(studentDetails.getSubject2());
        student.setSubject3(studentDetails.getSubject3());

        calculateTotalAndGrade(student);
        return studentRepository.save(student);
    }

    /**
     * Delete a student record
     */
    public void deleteStudent(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Student ID cannot be null");
        }
        studentRepository.deleteById(id);
    }
}
