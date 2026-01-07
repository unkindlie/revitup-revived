import * as yup from 'yup';

export const authLoginSchema = yup.object({
  email: yup
    .string()
    .required('E-mail is required')
    .email('E-mail is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short')
    .max(50, 'Password is too long'),
});
