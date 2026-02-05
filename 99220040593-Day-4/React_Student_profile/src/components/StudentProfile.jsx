import React, { useState } from 'react';
import './StudentProfile.css';

const StudentProfile = () => {
    const [student, setStudent] = useState({
        // Personal Information
        firstName: 'Rajesh',
        lastName: 'Kumar',
        dateOfBirth: '2000-05-15',
        gender: 'Male',
        bloodGroup: 'O+',
        nationality: 'Indian',

        // Contact Information
        email: 'rajesh.kumar@example.com',
        phone: '+91 98765 43210',
        address: '123 MG Road, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',

        // Academic Information
        studentId: 'STU2024001',
        rollNumber: 'CS21B001',
        department: 'Computer Science',
        semester: '6th Semester',
        batch: '2021-2025',
        cgpa: '8.5',

        // Guardian Information
        guardianName: 'Suresh Kumar',
        guardianRelation: 'Father',
        guardianPhone: '+91 98765 12345',
        guardianEmail: 'suresh.kumar@example.com',

        // Additional Information
        admissionDate: '2021-08-15',
        status: 'Active'
    });

    return (
        <div className="student-profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <div className="avatar-circle">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                    </div>
                </div>
                <div className="profile-title">
                    <h1>{student.firstName} {student.lastName}</h1>
                    <p className="student-id">Student ID: {student.studentId}</p>
                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                        {student.status}
                    </span>
                </div>
            </div>

            <div className="profile-content">
                {/* Personal Information Section */}
                <div className="info-section">
                    <h2 className="section-title">Personal Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>First Name</label>
                            <p>{student.firstName}</p>
                        </div>
                        <div className="info-item">
                            <label>Last Name</label>
                            <p>{student.lastName}</p>
                        </div>
                        <div className="info-item">
                            <label>Date of Birth</label>
                            <p>{new Date(student.dateOfBirth).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>
                        <div className="info-item">
                            <label>Gender</label>
                            <p>{student.gender}</p>
                        </div>
                        <div className="info-item">
                            <label>Blood Group</label>
                            <p>{student.bloodGroup}</p>
                        </div>
                        <div className="info-item">
                            <label>Nationality</label>
                            <p>{student.nationality}</p>
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="info-section">
                    <h2 className="section-title">Contact Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Email Address</label>
                            <p>{student.email}</p>
                        </div>
                        <div className="info-item">
                            <label>Phone Number</label>
                            <p>{student.phone}</p>
                        </div>
                        <div className="info-item full-width">
                            <label>Address</label>
                            <p>{student.address}</p>
                        </div>
                        <div className="info-item">
                            <label>City</label>
                            <p>{student.city}</p>
                        </div>
                        <div className="info-item">
                            <label>State</label>
                            <p>{student.state}</p>
                        </div>
                        <div className="info-item">
                            <label>Pincode</label>
                            <p>{student.pincode}</p>
                        </div>
                    </div>
                </div>

                {/* Academic Information Section */}
                <div className="info-section">
                    <h2 className="section-title">Academic Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Roll Number</label>
                            <p>{student.rollNumber}</p>
                        </div>
                        <div className="info-item">
                            <label>Department</label>
                            <p>{student.department}</p>
                        </div>
                        <div className="info-item">
                            <label>Current Semester</label>
                            <p>{student.semester}</p>
                        </div>
                        <div className="info-item">
                            <label>Batch</label>
                            <p>{student.batch}</p>
                        </div>
                        <div className="info-item">
                            <label>CGPA</label>
                            <p className="cgpa-value">{student.cgpa}</p>
                        </div>
                        <div className="info-item">
                            <label>Admission Date</label>
                            <p>{new Date(student.admissionDate).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>
                    </div>
                </div>

                {/* Guardian Information Section */}
                <div className="info-section">
                    <h2 className="section-title">Guardian Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Guardian Name</label>
                            <p>{student.guardianName}</p>
                        </div>
                        <div className="info-item">
                            <label>Relation</label>
                            <p>{student.guardianRelation}</p>
                        </div>
                        <div className="info-item">
                            <label>Guardian Phone</label>
                            <p>{student.guardianPhone}</p>
                        </div>
                        <div className="info-item">
                            <label>Guardian Email</label>
                            <p>{student.guardianEmail}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-actions">
                <button className="btn btn-primary">Edit Profile</button>
                <button className="btn btn-secondary">Download PDF</button>
                <button className="btn btn-secondary">Print</button>
            </div>
        </div>
    );
};

export default StudentProfile;
