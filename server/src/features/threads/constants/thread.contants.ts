export const THREADS_SELECT_OBJ = {
  id: true,
  title: true,
  createdAt: true,
  author: {
    id: true,
    username: true,
  },
};

export const THREAD_DETAILED_SELECT_OBJ = {
  id: true,
  title: true,
  description: true,
  createdAt: true,
  author: {
    id: true,
    username: true,
  },
};
