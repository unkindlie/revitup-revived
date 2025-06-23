import { registerAs } from '@nestjs/config';

export default registerAs('authConfig', () => ({
    hashSaltAmount: process.env.USER_HASH_SALT_AMOUNT,
}));
