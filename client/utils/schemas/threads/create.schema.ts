import * as yup from 'yup';

export const threadCreateSchema = yup.object({
  title: yup
    .string()
    .required()
    .min(10, 'Title must be at least 10 characters')
    .max(75, 'Title must not exceed 75 characters'),
  description: yup
    .string()
    .required()
    .max(5000, 'Text must not exceed 5000 characters'),
});
