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
    .max(50, 'dialogs.common.errorFields.password.too_long')
    .matches(/(?=.*[A-Z])/, 'dialogs.common.errorFields.password.no_uppercase')
    .matches(/(?=.*[a-z])/, 'dialogs.common.errorFields.password.no_lowercase')
    .matches(/(?=.*\d)/, 'dialogs.common.errorFields.password.no_number')
    .matches(
      /(?=.*[^A-Za-z0-9])/,
      'dialogs.common.errorFields.password.no_symbol',
    ),
});
