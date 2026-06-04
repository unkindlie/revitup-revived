export type UserDetailed = {
  id: number;
  username: string;
  roles: string[];
  isVerified: string;
  profileImgUrl: string | null;
  createdAt: Date;
};
