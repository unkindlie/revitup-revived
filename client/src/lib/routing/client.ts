export const Pages = {
  Main: '/',

  ArticlesIndex: '/articles',
  ArticleDetailed: '/articles/:id',

  EventsIndex: '/events',

  ThreadsIndex: '/threads',
  ThreadDetailed: '/threads/:id',

  Users: '/users',

  Profile: '/me',
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
] as const;

export function path(route: string, params?: Params): string {
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }

  return route;
}
