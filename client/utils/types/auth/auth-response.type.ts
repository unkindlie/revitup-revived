import { type TStoredUser } from './stored-user.type';

export type TAuthResponse = {
  user: TStoredUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
