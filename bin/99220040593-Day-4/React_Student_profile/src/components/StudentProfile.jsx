import React, { useState, useEffect } from 'react';
import './StudentProfile.css';

const StudentProfile = () => {
    const initialData = {
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
    };

    const [student, setStudent] = useState(() => {
        const savedData = localStorage.getItem('studentProfile');
        return savedData ? JSON.parse(savedData) : initialData;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempStudent, setTempStudent] = useState(student);

    useEffect(() => {
        localStorage.setItem('studentProfile', JSON.stringify(student));
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempStudent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setStudent(tempStudent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempStudent(student);
        setIsEditing(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const renderField = (label, name, value, type = 'text', fullWidth = false) => {
        return (
            <div className={`info-item ${fullWidth ? 'full-width' : ''}`}>
                <label>{label}</label>
                {isEditing ? (
                    <input
                        type={type}
                        name={name}
                        value={tempStudent[name]}
                        onChange={handleChange}
                        className="edit-input"
                    />
                ) : (
                    <p>{name.includes('Date') ? new Date(value).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : value}</p>
                )}
            </div>
        );
    };

    return (
        <div className="student-profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <div className="avatar-circle">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                    </div>
                </div>
                <div className="profile-title">
                    {isEditing ? (
                        <div className="header-edit">
                            <input
                                name="firstName"
                                value={tempStudent.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                            />
                            <input
                                name="lastName"
                                value={tempStudent.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                            />
                        </div>
                    ) : (
                        <h1>{student.firstName} {student.lastName}</h1>
                    )}
                    <p className="student-id">Student ID: {student.studentId}</p>
                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                        {student.status}
                    </span>
                </div>
            </div>

            <div className="profile-content">
                <div className="info-section">
                    <h2 className="section-title">Personal Information</h2>
                    <div className="info-grid">
                        {renderField('First Name', 'firstName', student.firstName)}
                        {renderField('Last Name', 'lastName', student.lastName)}
                        {renderField('Date of Birth', 'dateOfBirth', student.dateOfBirth, 'date')}
                        {renderField('Gender', 'gender', student.gender)}
                        {renderField('Blood Group', 'bloodGroup', student.bloodGroup)}
                        {renderField('Nationality', 'nationality', student.nationality)}
                    </div>
                </div>

                <div className="info-section">
                    <h2 className="section-title">Contact Information</h2>
                    <div className="info-grid">
                        {renderField('Email Address', 'email', student.email, 'email')}
                        {renderField('Phone Number', 'phone', student.phone)}
                        {renderField('Address', 'address', student.address, 'text', true)}
                        {renderField('City', 'city', student.city)}
                        {renderField('State', 'state', student.state)}
                        {renderField('Pincode', 'pincode', student.pincode)}
                    </div>
                </div>

                <div className="info-section">
                    <h2 className="section-title">Academic Information</h2>
                    <div className="info-grid">
                        {renderField('Roll Number', 'rollNumber', student.rollNumber)}
                        {renderField('Department', 'department', student.department)}
                        {renderField('Current Semester', 'semester', student.semester)}
                        {renderField('Batch', 'batch', student.batch)}
                        {renderField('CGPA', 'cgpa', student.cgpa)}
                        {renderField('Admission Date', 'admissionDate', student.admissionDate, 'date')}
                    </div>
                </div>

                <div className="info-section">
                    <h2 className="section-title">Guardian Information</h2>
                    <div className="info-grid">
                        {renderField('Guardian Name', 'guardianName', student.guardianName)}
                        {renderField('Relation', 'guardianRelation', student.guardianRelation)}
                        {renderField('Guardian Phone', 'guardianPhone', student.guardianPhone)}
                        {renderField('Guardian Email', 'guardianEmail', student.guardianEmail, 'email')}
                    </div>
                </div>
            </div>

            <div className="profile-actions no-print">
                {isEditing ? (
                    <>
                        <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
                        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        <button className="btn btn-secondary" onClick={handlePrint}>Download PDF / Print</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentProfile;
