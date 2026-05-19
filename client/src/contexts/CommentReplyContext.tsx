import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

type CommentReply = {
  id: number;
  content: string;
};
type CommentReplyContextType = [
  CommentReply | null,
  React.Dispatch<React.SetStateAction<CommentReply | null>>,
];

export const CommentReplyContext = createContext<
  CommentReplyContextType | undefined
>(undefined);

export const CommentReplyProvider = ({
  children,
  initialValue = null,
}: PropsWithChildren<{ initialValue?: CommentReply | null }>) => {
  const state = useState<CommentReply | null>(initialValue);

  return (
    <CommentReplyContext.Provider value={state}>
      {children}
    </CommentReplyContext.Provider>
  );
};

export const useCommentReply = (): CommentReplyContextType => {
  const context = useContext(CommentReplyContext);
  if (!context)
    throw new Error('useCommentReply must be used within CommentReplyProvider');

  return context;
};
