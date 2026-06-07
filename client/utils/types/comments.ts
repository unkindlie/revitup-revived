export type TComment = {
  id: number;
  content: string;
  author: {
    id: number;
    username: string;
    roles: string[];
    profileImgUrl: string;
    favoriteDriver: {
      id: number;
      lastName: string;
      number: number;
    } | null;
  };
  parentId: string | null;
  createdAt: string;
  children: TComment[];
};

export type TCommentsResponse = {
  comments: TComment[];
  totalCount: number;
};

export type TCommentSource = 'article' | 'thread';

export type TCommentCreate = {
  entitySource: TCommentSource;
  entityId: number;
  content: string;
  parentId?: number;
};
