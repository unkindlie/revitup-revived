import * as yup from 'yup';

export const threadCreateSchema = yup.object({
  title: yup
    .string()
    .required('Title must be filled')
    .min(10, 'Title must be at least 10 characters')
    .max(75, 'Title must not exceed 75 characters'),
  description: yup
    .string()
    .required('Description must be filled. Even one symbol is ok')
    .max(5000, 'Text must not exceed 5000 characters'),
  categoryId: yup.number().integer().required('Category must be selected'),
});
