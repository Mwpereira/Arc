import {extend} from 'vee-validate';
import {alpha_dash, confirmed, email, max, min, required} from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Required Field',
});

extend('email', {
    ...email,
    message: 'This field must be a valid email',
});

extend('username', {
    ...alpha_dash,
    message: 'Username can only contain alphanumeric characters',
});

extend('min_username', {
    ...min,
    message: 'Username must be 3 or more characters long',
});

extend('max_username', {
    ...max,
    message: 'Username must be 18 or less characters long',
});

extend('min_password', {
    ...min,
    message: 'Password must be 7 or more characters long',
});

extend('confirmed', {
    ...confirmed,
    message: 'Passwords do not match',
});

extend('max_account_characters', {
    ...max,
    message: 'Exceeds 32 character limit',
});
