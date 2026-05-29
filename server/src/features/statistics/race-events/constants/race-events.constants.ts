export const RACE_EVENT_MANY_SELECT_BY_SEASON = {
  id: true,
  name: true,
  laps: true,
  eventStage: true,
  startDate: true,
  endDate: true,
  circuit: {
    id: true,
    name: true,
    length: true,
  },
};

export const RACE_EVENT_ONE_SELECT = {
  id: true,
  name: true,
  description: true,
  laps: true,
  eventStage: true,
  startDate: true,
  endDate: true,
  circuit: {
    id: true,
    name: true,
    length: true,
    location: true,
  },
  season: true,
};
