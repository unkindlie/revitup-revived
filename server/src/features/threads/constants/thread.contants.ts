export const THREADS_SELECT_OBJ = {
  id: true,
  title: true,
  createdAt: true,
  author: {
    id: true,
    username: true,
  },
  category: {
    id: true,
    name: true,
    color: true,
    shortCode: true,
  },
};

export const THREAD_DETAILED_SELECT_OBJ = {
  ...THREADS_SELECT_OBJ,
  author: {
    id: true,
    profileImgUrl: true,
    username: true,
    roles: true,
  },
  description: true,
};
