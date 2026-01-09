import * as yup from 'yup';

export const authLoginSchema = yup.object({
  email: yup
    .string()
    .required('dialogs.common.errorFields.email.required')
    .email('dialogs.common.errorFields.email.not_valid'),
  password: yup
    .string()
    .required('dialogs.common.errorFields.password.required')
    .min(8, 'dialogs.common.errorFields.password.too_short')
    .max(50, 'dialogs.common.errorFields.password.too_long'),
});
