export const ARTICLES_SELECT_MANY_OBJ = {
  id: true,
  title: true,
  mainImgUrl: true,
  previewText: true,
  createdAt: true,
};

export const ARTICLES_SELECT_ONE_OBJ = {
  ...ARTICLES_SELECT_MANY_OBJ,
  text: true,
  updatedAt: true,
  paragraphs: true,
};
