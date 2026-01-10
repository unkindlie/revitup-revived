export const BackendRoutes = {
  // Auth routes
  AuthLogin: '/auth/login',
  AuthLogout: '/auth/logout',
  AuthRefresh: '/auth/refresh',
  AuthRegister: '/auth/register',
  AuthChangePassword: '/auth/password-reset/request',

  // User routes
  Users: '/users',
} as const;

