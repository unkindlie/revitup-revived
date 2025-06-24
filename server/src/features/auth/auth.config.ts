import { registerAs } from '@nestjs/config';

export default registerAs('authConfig', () => ({
    hashSaltAmount: process.env.USER_HASH_SALT_AMOUNT,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
}));
