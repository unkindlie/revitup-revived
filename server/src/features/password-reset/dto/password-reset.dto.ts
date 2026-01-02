export type PasswordServiceResetDto = {
  id: string;
  password: string;
};

export type PasswordServiceLoggedRequestDto = {
  userId: number;
  password: string;
};
