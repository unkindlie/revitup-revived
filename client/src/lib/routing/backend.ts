export const BackendRoutes = {
  // Auth routes
  AuthLogin: 'auth/login',
  AuthLogout: 'auth/logout',
  AuthRefresh: 'auth/refresh',
  AuthRegister: 'auth/register',
  AuthChangePassword: 'auth/password-reset/request',
  AuthGoogleLogin: 'auth/google/login',

  // User routes
  Users: 'users',
  UserById: 'users/:id',
  UserProfileImagesById: 'users/profile-images',

  // Article routes
  ArticleBase: 'articles',
  ArticleDetailed: 'articles/:id',
  ArticleUpdate: 'articles/update/:id',
  ArticleSoftDelete: 'articles/soft/:id',

  // Thread routes
  ThreadBase: 'threads',
  ThreadBaseByCategory: 'threads/by-category/:code',
  ThreadDetailed: 'threads/:id',

  // Thread category routes
  ThreadCategoryBase: 'thread-categories',
} as const;

type RoutesKeys = keyof typeof BackendRoutes;
type Params = Record<string, string | number>;

export function backendPath<K extends RoutesKeys>(
  page: K,
  params?: Params,
): string {
  let route = BackendRoutes[page] as string;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }
  return route;
}
