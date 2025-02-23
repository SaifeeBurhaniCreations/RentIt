import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const RegisterSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  conf_password: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  phone: yup.string().required('Phone Number is required'),
});