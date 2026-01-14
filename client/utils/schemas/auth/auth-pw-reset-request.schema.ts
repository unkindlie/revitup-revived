import * as yup from 'yup';

export const authPwResetRequestSchema = yup.object({
  email: yup
    .string()
    .required('dialogs.common.errorFields.email.required')
    .email('dialogs.common.errorFields.email.not_valid'),
});
