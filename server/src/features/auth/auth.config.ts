import { registerAs } from '@nestjs/config';

export default registerAs('authConfig', () => ({
  hashSaltAmount: process.env.USER_HASH_SALT_AMOUNT,
  access: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
}));
