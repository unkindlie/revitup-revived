export type TComment = {
  id: number;
  content: string;
  author: {
    id: number;
    username: string;
    roles: string[];
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
