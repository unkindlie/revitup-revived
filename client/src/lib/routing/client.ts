export const Pages = {
  Main: '/',

  ArticlesIndex: '/articles',
  ArticleDetailed: '/articles/:id',
  ArticleDraftEdit: '/articles/draft/:id',

  EventsIndex: '/events',
  EventDetailed: '/events/:id',

  ThreadsIndex: '/threads',
  ThreadDetailed: '/threads/:id',

  Users: '/users',
  UserProfile: '/users/:id',

  Profile: '/me',

  StatisticsBase: '/stats',
  StatisticsSeasons: '/stats/seasons',
  StatisticsSeasonDetailed: '/stats/seasons/:id',
  StatisticsRaceDetailed: '/stats/race-events/:id',
} as const;

type Params = Record<string, string | number>;

export const NAV_ROUTES = [
  {
    id: 'news',
    route: Pages.Main,
  },
  {
    id: 'events',
    route: Pages.EventsIndex,
  },
  {
    id: 'threads',
    route: Pages.ThreadsIndex,
  },
  {
    id: 'stats',
    route: Pages.StatisticsBase,
  },
] as const;

export function path(route: string, params?: Params): string {
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }

  return route;
}
