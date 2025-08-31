import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: process.env.PG_DB_PORT,
  username: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
}));
