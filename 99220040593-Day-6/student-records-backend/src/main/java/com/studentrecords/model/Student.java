package com.studentrecords.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false)
    private Integer subject1;
    
    @Column(nullable = false)
    private Integer subject2;
    
    @Column(nullable = false)
    private Integer subject3;
    
    @Column(nullable = false)
    private Integer total;
    
    @Column(nullable = false, length = 1)
    private String grade;
}
