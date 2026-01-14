import { IsStrongPasswordOptions } from 'class-validator';

export const STRONG_PASSWORD_REQS: IsStrongPasswordOptions = {
  minLength: 8,
  minUppercase: 1,
  minLowercase: 0,
  minNumbers: 0,
  minSymbols: 1,
};

export const REFRESH_TOKEN_NAME = 'refreshToken';

export const REFRESH_TOKEN_LIFE_IN_MS = 1000 * 60 * 60 * 24 * 30;

export const DEFAULT_SECRET = 'default-secret-key-00';
