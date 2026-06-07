export type UserDetailed = {
  id: number;
  username: string;
  description: string | null;
  roles: string[];
  isVerified: string;
  profileImgUrl: string | null;
  createdAt: Date;
};
