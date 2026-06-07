export const BackendRoutes = {
  // Auth routes
  AuthLogin: 'auth/login',
  AuthLogout: 'auth/logout',
  AuthRefresh: 'auth/refresh',
  AuthRegister: 'auth/register',
  AuthRequestPasswordReset: 'auth/password-reset/request',
  AuthChangePasswordLogged: 'auth/password-reset/logged',
  AuthChangePasswordById: 'auth/password-reset/:id',
  AuthGoogleLogin: 'auth/google/login',

  // User routes
  Users: 'users',
  UserById: 'users/:id',
  UserProfileImagesById: 'users/profile-images',
  UserLatestPfp: 'users/pfp/:id',
  UserUploadPfp: 'users/upload-pfp',
  UserDeletePfp: 'users/pfp/:imageId',
  UserUpdateProfile: 'users/update-profile',
  UserToggleFavDriver: 'users/favourite-driver',

  // Article routes
  ArticleBase: 'articles',
  ArticleDetailed: 'articles/:id',
  ArticleUpdate: 'articles/update/:id',
  ArticleSoftDelete: 'articles/soft/:id',
  ArticleRandom: 'articles/random',

  // Event routes
  EventsBase: 'events',
  EventDetailed: 'events/:id',

  // Thread routes
  ThreadBase: 'threads',
  ThreadsLatest: 'threads/latest',
  ThreadBaseByCategory: 'threads/by-category/:code',
  ThreadDetailed: 'threads/:id',

  // Thread category routes
  ThreadCategoryBase: 'thread-categories',

  // Comment routes
  CommentsBase: 'comments',

  // Statistics routes
  RaceSeasons: 'race-seasons',
  RaceSeasonDetailed: 'race-seasons/:id',
  RaceEventDetailed: 'race-events/:id',

  // SearchRoutes
  Search: 'search',
  SearchRecent: 'search/items',

  // DriversRoutes
  DriversBase: 'drivers',
  DriverDetailed: 'drivers/:id',
  DriverFavourite: 'drivers/favourite/:id',
} as const;

type RoutesKeys = keyof typeof BackendRoutes;
type Params = Record<string, string | number>;
type QueryParams = Record<string, string | number | boolean | undefined>;

export function backendPath<K extends RoutesKeys>(
  page: K,
  params?: Params,
  queryParams?: QueryParams,
): string {
  let route = BackendRoutes[page] as string;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }

  if (queryParams) {
    const search = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        search.append(key, String(value));
      }
    });

    const queryString = search.toString();

    if (queryString) {
      route += `?${queryString}`;
    }
  }

  return route;
}
