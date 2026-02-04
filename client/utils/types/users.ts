export type UserDetailed = {
  id: number;
  username: string;
  roles: string[];
  isVerified: string;
  profileImg: string | null;
  createdAt: Date;
};
