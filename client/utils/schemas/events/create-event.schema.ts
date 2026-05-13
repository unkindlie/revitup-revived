import * as yup from 'yup';

export const createEventSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(15, 'Title must be at least 15 characters')
    .max(125, 'Title must not exceed 125 characters'),
  description: yup.string().optional(),
  location: yup
    .string()
    .optional()
    .max(250, 'Location must not exceed 250 characters'),
  startDate: yup.date().required('Start date must be selected'),
  endDate: yup
    .date()
    .required('End date must be selected')
    .test(
      'end-date-after-start',
      'End date must be after or equal to start date',
      function (endDate) {
        const { startDate } = this.parent;
        if (!startDate || !endDate) return true;
        return endDate >= startDate;
      },
    ),
  mainImage: yup.mixed().optional(),
});

export type CreateEventSchema = yup.InferType<typeof createEventSchema>;
