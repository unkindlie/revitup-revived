export type TComment = {
  id: number;
  content: string;
  author: {
    id: number;
    username: string;
    roles: string[];
  };
  parentId: string | null;
  children: TComment[];
};

export type TCommentSource = 'article' | 'thread';

export type TCommentCreate = {
  entitySource: TCommentSource;
  entityId: number;
  content: string;
  parentId?: number;
};
