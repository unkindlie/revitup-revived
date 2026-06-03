export const EVENT_SELECT_MANY_OBJ = {
  id: true,
  title: true,
  mainImgUrl: true,
  startDate: true,
  endDate: true,
};

export const EVENT_SELECT_ONE_OBJ = {
  ...EVENT_SELECT_MANY_OBJ,
  description: true,
  location: true,
};
