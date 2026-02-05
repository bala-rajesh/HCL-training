// Get form and input elements using DOM
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const resetBtn = document.getElementById('resetBtn');

// Get all input fields
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const dobInput = document.getElementById('dob');
const courseInput = document.getElementById('course');
const studentIdInput = document.getElementById('studentId');
const addressInput = document.getElementById('address');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsInput = document.getElementById('terms');

// Validation functions
function validateFullName() {
    const fullName = fullNameInput.value.trim();
    const errorElement = document.getElementById('fullNameError');
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    if (fullName === '') {
        showError(fullNameInput, errorElement, 'Full name is required');
        return false;
    } else if (!nameRegex.test(fullName)) {
        showError(fullNameInput, errorElement, 'Name must contain only letters (2-50 characters)');
        return false;
    } else {
        showSuccess(fullNameInput, errorElement);
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const errorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        showError(emailInput, errorElement, 'Email address is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, errorElement, 'Please enter a valid email address');
        return false;
    } else {
        showSuccess(emailInput, errorElement);
        return true;
    }
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const errorElement = document.getElementById('phoneError');
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;

    if (phone === '') {
        showError(phoneInput, errorElement, 'Phone number is required');
        return false;
    } else if (!phoneRegex.test(phone)) {
        showError(phoneInput, errorElement, 'Please enter a valid phone number (10-15 digits)');
        return false;
    } else {
        showSuccess(phoneInput, errorElement);
        return true;
    }
}

function validateDOB() {
    const dob = dobInput.value;
    const errorElement = document.getElementById('dobError');

    if (dob === '') {
        showError(dobInput, errorElement, 'Date of birth is required');
        return false;
    }

    // Check if student is at least 15 years old and not more than 100 years old
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 15) {
        showError(dobInput, errorElement, 'You must be at least 15 years old');
        return false;
    } else if (age > 100) {
        showError(dobInput, errorElement, 'Please enter a valid date of birth');
        return false;
    } else {
        showSuccess(dobInput, errorElement);
        return true;
    }
}

function validateGender() {
    const genderInputs = document.getElementsByName('gender');
    const errorElement = document.getElementById('genderError');
    let isChecked = false;

    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (!isChecked) {
        errorElement.textContent = 'Please select your gender';
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        return true;
    }
}

function validateCourse() {
    const course = courseInput.value;
    const errorElement = document.getElementById('courseError');

    if (course === '') {
        showError(courseInput, errorElement, 'Please select a course');
        return false;
    } else {
        showSuccess(courseInput, errorElement);
        return true;
    }
}

function validateStudentId() {
    const studentId = studentIdInput.value.trim();
    const errorElement = document.getElementById('studentIdError');
    const studentIdRegex = /^[A-Z]{3}\d{5}$/;

    if (studentId === '') {
        showError(studentIdInput, errorElement, 'Student ID is required');
        return false;
    } else if (!studentIdRegex.test(studentId)) {
        showError(studentIdInput, errorElement, 'Student ID must be in format: ABC12345 (3 letters + 5 digits)');
        return false;
    } else {
        showSuccess(studentIdInput, errorElement);
        return true;
    }
}

function validateAddress() {
    const address = addressInput.value.trim();
    const errorElement = document.getElementById('addressError');

    if (address === '') {
        showError(addressInput, errorElement, 'Address is required');
        return false;
    } else if (address.length < 10) {
        showError(addressInput, errorElement, 'Please enter a complete address (at least 10 characters)');
        return false;
    } else {
        showSuccess(addressInput, errorElement);
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    const errorElement = document.getElementById('passwordError');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password === '') {
        showError(passwordInput, errorElement, 'Password is required');
        return false;
    } else if (!passwordRegex.test(password)) {
        showError(passwordInput, errorElement, 'Password must be 8+ chars with uppercase, lowercase, number & special char');
        return false;
    } else {
        showSuccess(passwordInput, errorElement);
        return true;
    }
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const errorElement = document.getElementById('confirmPasswordError');

    if (confirmPassword === '') {
        showError(confirmPasswordInput, errorElement, 'Please confirm your password');
        return false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, errorElement, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPasswordInput, errorElement);
        return true;
    }
}

function validateTerms() {
    const errorElement = document.getElementById('termsError');

    if (!termsInput.checked) {
        errorElement.textContent = 'You must agree to the terms and conditions';
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        return true;
    }
}

// Helper functions to show error/success states using DOM manipulation
function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    inputElement.classList.remove('success');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function showSuccess(inputElement, errorElement) {
    inputElement.classList.remove('error');
    inputElement.classList.add('success');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Real-time validation on blur
fullNameInput.addEventListener('blur', validateFullName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
dobInput.addEventListener('blur', validateDOB);
courseInput.addEventListener('blur', validateCourse);
studentIdInput.addEventListener('blur', validateStudentId);
addressInput.addEventListener('blur', validateAddress);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

// Real-time validation for gender radio buttons
const genderInputs = document.getElementsByName('gender');
for (let i = 0; i < genderInputs.length; i++) {
    genderInputs[i].addEventListener('change', validateGender);
}

// Real-time validation for terms checkbox
termsInput.addEventListener('change', validateTerms);

// Real-time password match check
confirmPasswordInput.addEventListener('input', function () {
    if (confirmPasswordInput.value !== '') {
        validateConfirmPassword();
    }
});

// Form submission handler
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isDOBValid = validateDOB();
    const isGenderValid = validateGender();
    const isCourseValid = validateCourse();
    const isStudentIdValid = validateStudentId();
    const isAddressValid = validateAddress();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();

    // Check if all validations passed
    const isFormValid = isFullNameValid && isEmailValid && isPhoneValid && isDOBValid &&
        isGenderValid && isCourseValid && isStudentIdValid && isAddressValid &&
        isPasswordValid && isConfirmPasswordValid && isTermsValid;

    if (isFormValid) {
        // Hide form and show success message using DOM manipulation
        form.style.display = 'none';
        successMessage.style.display = 'flex';

        // Log form data to console (in real app, this would be sent to server)
        console.log('Form submitted successfully!');
        console.log({
            fullName: fullNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            dob: dobInput.value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            course: courseInput.value,
            studentId: studentIdInput.value,
            address: addressInput.value
        });

        // Reset form after 3 seconds and show it again
        setTimeout(function () {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';

            // Remove all success classes
            const successInputs = document.querySelectorAll('.success');
            for (let i = 0; i < successInputs.length; i++) {
                successInputs[i].classList.remove('success');
            }
        }, 3000);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Reset button handler
resetBtn.addEventListener('click', function () {
    // Reset form
    form.reset();

    // Clear all error and success states using DOM manipulation
    const allInputs = document.querySelectorAll('input, select, textarea');
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].classList.remove('error', 'success');
    }

    // Hide all error messages
    const allErrors = document.querySelectorAll('.error-message');
    for (let i = 0; i < allErrors.length; i++) {
        allErrors[i].textContent = '';
        allErrors[i].style.display = 'none';
    }

    // Hide success message
    successMessage.style.display = 'none';
});
