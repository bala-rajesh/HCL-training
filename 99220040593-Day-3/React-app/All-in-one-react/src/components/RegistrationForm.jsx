import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    course: '',
    studentId: '',
    address: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [successFields, setSuccessFields] = useState(new Set());
  const [showSuccess, setShowSuccess] = useState(false);

  // Validation Functions
  const validateFullName = (value) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!value.trim()) return 'Full name is required';
    if (!nameRegex.test(value)) return 'Name must contain only letters (2-50 characters)';
    return '';
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return 'Email address is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    if (!value.trim()) return 'Phone number is required';
    if (!phoneRegex.test(value)) return 'Please enter a valid phone number (10-15 digits)';
    return '';
  };

  const validateDOB = (value) => {
    if (!value) return 'Date of birth is required';
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 15) return 'You must be at least 15 years old';
    if (age > 100) return 'Please enter a valid date of birth';
    return '';
  };

  const validateGender = (value) => {
    if (!value) return 'Please select your gender';
    return '';
  };

  const validateCourse = (value) => {
    if (!value) return 'Please select a course';
    return '';
  };

  const validateStudentId = (value) => {
    const studentIdRegex = /^[A-Z]{3}\d{5}$/;
    if (!value.trim()) return 'Student ID is required';
    if (!studentIdRegex.test(value)) return 'Student ID must be in format: ABC12345 (3 letters + 5 digits)';
    return '';
  };

  const validateAddress = (value) => {
    if (!value.trim()) return 'Address is required';
    if (value.trim().length < 10) return 'Please enter a complete address (at least 10 characters)';
    return '';
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value) return 'Password is required';
    if (!passwordRegex.test(value)) return 'Password must be 8+ chars with uppercase, lowercase, number & special char';
    return '';
  };

  const validateConfirmPassword = (value) => {
    if (!value) return 'Please confirm your password';
    if (value !== formData.password) return 'Passwords do not match';
    return '';
  };

  const validateTerms = (value) => {
    if (!value) return 'You must agree to the terms and conditions';
    return '';
  };

  const validators = {
    fullName: validateFullName,
    email: validateEmail,
    phone: validatePhone,
    dob: validateDOB,
    gender: validateGender,
    course: validateCourse,
    studentId: validateStudentId,
    address: validateAddress,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    terms: validateTerms
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validators[name](value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (!error && value) {
      setSuccessFields(prev => new Set([...prev, name]));
    } else {
      setSuccessFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      const error = validators[field](formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    // If no errors, show success
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully!', formData);
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          dob: '',
          gender: '',
          course: '',
          studentId: '',
          address: '',
          password: '',
          confirmPassword: '',
          terms: false
        });
        setSuccessFields(new Set());
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      course: '',
      studentId: '',
      address: '',
      password: '',
      confirmPassword: '',
      terms: false
    });
    setErrors({});
    setSuccessFields(new Set());
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <div className="glass-panel fade-in" style={{ maxWidth: '500px', margin: '2rem auto', padding: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <svg style={{ width: '80px', height: '80px', color: '#2ed573', marginBottom: '1.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 style={{ fontSize: '1.8rem', color: '#2ed573', marginBottom: '0.75rem', fontWeight: 700 }}>Registration Successful!</h3>
          <p style={{ fontSize: '1rem', opacity: 0.8 }}>Your account has been created successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ opacity: 0.8, fontSize: '1rem' }}>Fill in your details to register</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="form-field">
          <label>Full Name <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input
            type="text"
            name="fullName"
            className={`glass-input ${errors.fullName ? 'field-error' : ''} ${successFields.has('fullName') ? 'field-success' : ''}`}
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        {/* Email */}
        <div className="form-field">
          <label>Email Address <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input
            type="email"
            name="email"
            className={`glass-input ${errors.email ? 'field-error' : ''} ${successFields.has('email') ? 'field-success' : ''}`}
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className="form-field">
          <label>Phone Number <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input
            type="tel"
            name="phone"
            className={`glass-input ${errors.phone ? 'field-error' : ''} ${successFields.has('phone') ? 'field-success' : ''}`}
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        {/* Date of Birth */}
        <div className="form-field">
          <label>Date of Birth <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input
            type="date"
            name="dob"
            className={`glass-input ${errors.dob ? 'field-error' : ''} ${successFields.has('dob') ? 'field-success' : ''}`}
            value={formData.dob}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.dob && <span className="error-message">{errors.dob}</span>}
        </div>

        {/* Gender */}
        <div className="form-field">
          <label>Gender <span style={{ color: '#ff6b6b' }}>*</span></label>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            {['male', 'female', 'other'].map(option => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 400 }}>
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                />
                <span style={{ textTransform: 'capitalize' }}>{option}</span>
              </label>
            ))}
          </div>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        {/* Course */}
        <div className="form-field">
          <label>Course <span style={{ color: '#ff6b6b' }}>*</span></label>
          <select
            name="course"
            className={`glass-input ${errors.course ? 'field-error' : ''} ${successFields.has('course') ? 'field-success' : ''}`}
            value={formData.course}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ cursor: 'pointer' }}
          >
            <option value="">Select a course</option>
            <option value="computer-science">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business Administration</option>
            <option value="arts">Arts & Humanities</option>
            <option value="science">Natural Sciences</option>
            <option value="mathematics">Mathematics</option>
          </select>
          {errors.course && <span className="error-message">{errors.course}</span>}
        </div>

        {/* Student ID */}
        <div className="form-field">
          <label>Student ID <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input
            type="text"
            name="studentId"
            className={`glass-input ${errors.studentId ? 'field-error' : ''} ${successFields.has('studentId') ? 'field-success' : ''}`}
            placeholder="e.g., STU12345"
            value={formData.studentId}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.studentId && <span className="error-message">{errors.studentId}</span>}
        </div>

        {/* Address */}
        <div className="form-field">
          <label>Address <span style={{ color: '#ff6b6b' }}>*</span></label>
          <textarea
            name="address"
            className={`glass-input ${errors.address ? 'field-error' : ''} ${successFields.has('address') ? 'field-success' : ''}`}
            placeholder="Enter your complete address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ resize: 'vertical', minHeight: '80px' }}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        {/* Password */}
        <div className="form-field">
          <label>Password <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input
            type="password"
            name="password"
            className={`glass-input ${errors.password ? 'field-error' : ''} ${successFields.has('password') ? 'field-success' : ''}`}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className="form-field">
          <label>Confirm Password <span style={{ color: '#ff6b6b' }}>*</span></label>
          <input
            type="password"
            name="confirmPassword"
            className={`glass-input ${errors.confirmPassword ? 'field-error' : ''} ${successFields.has('confirmPassword') ? 'field-success' : ''}`}
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        {/* Terms and Conditions */}
        <div className="form-field">
          <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', fontWeight: 400 }}>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ marginRight: '0.75rem', marginTop: '0.25rem', cursor: 'pointer' }}
            />
            <span>I agree to the <a href="#" style={{ color: '#a5b4fc', textDecoration: 'none' }}>Terms and Conditions</a></span>
          </label>
          {errors.terms && <span className="error-message">{errors.terms}</span>}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="glass-btn" style={{ flex: 1 }}>
            Register
          </button>
          <button type="button" className="glass-btn" onClick={handleReset} style={{ flex: 1, opacity: 0.7 }}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
