import { Request } from 'express';

export const RefreshTokenExtractor = (req: Request) => {
  const { refreshToken } = req.cookies;

  return refreshToken as string;
};
