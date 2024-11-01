// formValidation.js

// Validate First Name
export const validateFirstName = (firstName) => {
      return firstName.trim() !== '';
    };
    
    // Validate Last Name
    export const validateLastName = (lastName) => {
      return lastName.trim() !== '';
    };
    
    // Validate Email
    export const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    // Validate Password
    export const validatePassword = (password) => {
      return password.length >= 6;
    };
    
    // Validate Confirm Password
    export const validateConfirmPassword = (password, confirmPassword) => {
      return password === confirmPassword;
    };
    