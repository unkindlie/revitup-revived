export const Pages = {
  ArticleDetailed: '/articles/:id',

  Profile: '/me',
} as const;

type PagesKeys = keyof typeof Pages;
type Params = Record<string, string | number>;

export function path(route: string, params?: Params): string {
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }

  return route;
}
