import * as yup from 'yup';

export const editArticleSchema = yup.object({
  title: yup
    .string()
    .min(25, 'Title must be at least 25 characters')
    .max(125, 'Title must not exceed 125 characters'),
  previewText: yup
    .string()
    .max(200, 'Preview text must not exceed 200 characters'),
  text: yup
    .string()
    .max(2000, 'Text must not exceed 2000 characters'),
  imageUrl: yup
    .string()
    .url('Image URL must be a valid URL'),
});
