import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup.string().min(3, 'Name must be minimum 3 characters').required(),
  email: yup.string().email('Invalid email').required(),
  password: yup
    .string()
    .min(6, 'Password must be minimum 6 characters')
    .max(30, 'Password must be maximum 30 characters')
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required(),
  password: yup
    .string()
    .min(6, 'Password must be minimum 6 characters')
    .max(30, 'Password must be maximum 30 characters')
    .required(),
});
