export const Pages = {
  ArticleDetailed: '/articles/:id',
} as const;

type PagesKeys = keyof typeof Pages;
type Params = Record<string, string | number>;

export function path<K extends PagesKeys>(page: K, params?: Params): string {
  let route = Pages[page] as string;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }
  return route;
}
