import { IsStrongPasswordOptions } from 'class-validator';

export const strongPasswordReqs: IsStrongPasswordOptions = {
    minLength: 8,
    minUppercase: 0,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
};
