const form = document.getElementById('registrationForm');
const fields = ['email', 'country', 'zipCode', 'password', 'confirmPassword'];
const errors = {};

fields.forEach(field => {
    const input = document.getElementById(field);
    const errorElement = document.getElementById(`${field}Error`);
    errors[field] = errorElement;

    input.addEventListener('input', () => validateField(field));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateAllFields()) {
        document.getElementById('high-five').style.display = 'block';
    }
});

function validateField(field) {
    const input = document.getElementById(field);
    let isValid = true;
    let errorMessage = '';

    switch (field) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            errorMessage = 'Please enter a valid email address.';
            break;
        case 'country':
            isValid = input.value.trim().length > 0;
            errorMessage = 'Country is required.';
            break;
        case 'zipCode':
            isValid = /^\d{5}(-\d{4})?$/.test(input.value);
            errorMessage = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789).';
            break;
        case 'password':
            isValid = input.value.length >= 8;
            errorMessage = 'Password must be at least 8 characters long.';
            break;
        case 'confirmPassword':
            isValid = input.value === document.getElementById('password').value;
            errorMessage = 'Passwords do not match.';
            break;
    }

    if (!isValid && input.value.trim() !== '') {
        input.classList.add('invalid');
        errors[field].textContent = errorMessage;
    } else {
        input.classList.remove('invalid');
        errors[field].textContent = '';
    }

    return isValid;
}

function validateAllFields() {
    let isValid = true;
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    return isValid;
}