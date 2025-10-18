import * as yup from 'yup';

export const authLoginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(50),
});
