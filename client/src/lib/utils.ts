import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function joinStr(
  separator: string = ' ',
  ...values: (string | number | boolean)[]
) {
  return values.join(separator);
}
