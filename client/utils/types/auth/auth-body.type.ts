export type TAuthBody = {
  email: string;
  password: string;
};

export type TAuthRegister = TAuthBody & {
  username: string;
};
