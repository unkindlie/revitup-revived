import * as yup from 'yup';

export const createArticleSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(25, 'Title must be at least 25 characters')
    .max(125, 'Title must not exceed 125 characters'),
  previewText: yup
    .string()
    .max(200, 'Preview text must not exceed 200 characters')
    .optional(),
  text: yup
    .string()
    .max(2000, 'Text must not exceed 2000 characters')
    .optional(),
  imageUrl: yup
    .string()
    .required('Image URL is required')
    .url('Image URL must be a valid URL'),
});
