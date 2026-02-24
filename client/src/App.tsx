import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Container } from '@/components/container/Container';
import { Pages } from '@/lib/routing/client';
import {
  ArticleDetailedPage,
  ArticlesIndexPage,
  RegistrationPage,
  GoogleAuthRedirectPage,
  StartPage,
  MePage,
  ThreadsIndexPage,
  ThreadDetailedPage,
  UserProfilePage,
} from '@/pages';
import { ErrorBoundary } from '@/pages/NotFoundErrorBoundary';
import { AuthProvider } from '@/providers/AuthProvider';

TimeAgo.addLocale(en);

const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: false } },
});

function App() {
  const router = createBrowserRouter([
    {
      Component: Container,
      ErrorBoundary: ErrorBoundary,
      children: [
        {
          path: '/',
          Component: StartPage,
        },
        {
          path: '/register',
          Component: RegistrationPage,
        },
        {
          path: '/google-auth',
          Component: GoogleAuthRedirectPage,
        },
        {
          path: '/articles',
          children: [
            { index: true, Component: ArticlesIndexPage },
            {
              path: ':id',
              Component: ArticleDetailedPage,
            },
          ],
        },
        {
          path: Pages.ThreadsIndex,
          children: [
            { index: true, Component: ThreadsIndexPage },
            {
              path: ':id',
              Component: ThreadDetailedPage,
            },
          ],
        },
        {
          path: Pages.Users,
          children: [
            { index: true, Component: null },
            { path: ':id', Component: UserProfilePage },
          ],
        },
        {
          // Will be extended later as a profile dashboard
          path: '/me',
          children: [{ index: true, Component: MePage }],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
