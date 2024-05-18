class FormValidator {
    constructor(form) {
        this.form = form;
        this.fields = [];
        this.errors = {};
    }

    addField(selector, rules) {
        const field = this.form.querySelector(selector);
        if (field) this.fields.push({ field, rules });
    }

    validate() {
        this.errors = {};
        this.fields.forEach(({ field, rules }) => {
            rules.forEach(rule => {
                const error = rule(field.value);
                if (error) {
                    if (!this.errors[field.name]) this.errors[field.name] = [];
                    this.errors[field.name].push(error);
                }
            });
        });
        return this.errors;
    }

    showErrors() {
        this.form.querySelectorAll('.error-message').forEach(el => el.remove());
        for (let fieldName in this.errors) {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            this.errors[fieldName].forEach(error => {
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.textContent = error;
                field.parentElement.appendChild(errorElement);
            });
        }
    }
}

const rules = {
    required: value => value ? null : 'This field is required.',
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Please enter a valid email address.',
    minLength: min => value => value.length >= min ? null : `Please enter at least ${min} characters.`,
    passwordMatch: field => value => value === field.value ? null : 'Passwords do not match.'
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#myForm');
    const validator = new FormValidator(form);

    validator.addField('#username', [rules.required, rules.minLength(3)]);
    validator.addField('#email', [rules.required, rules.email]);
    validator.addField('#password', [rules.required, rules.minLength(6)]);
    validator.addField('#confirmPassword', [rules.required, rules.passwordMatch(form.querySelector('#password'))]);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const errors = validator.validate();
        if (Object.keys(errors).length > 0) {
            validator.showErrors();
        } else {
            console.log('Form is valid');
        }
    });
});