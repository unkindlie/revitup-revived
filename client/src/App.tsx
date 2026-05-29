import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Container } from '@/components/container/Container';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Pages } from '@/lib/routing/client';
import {
  ArticleDetailedPage,
  ArticlesIndexPage,
  RegistrationPage,
  GoogleAuthRedirectPage,
  PasswordResetPage,
  StartPage,
  MePage,
  ThreadsIndexPage,
  ThreadDetailedPage,
  UserProfilePage,
  CategoryThreadsPage,
  EventsPage,
  EventsDetailedPade,
  StatsBasePage,
  StatsSeasonsPage,
  StatsSeasonDetailed,
  StatsEventPage,
} from '@/pages';
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import '@/time-ago';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

function App() {
  const router = createBrowserRouter([
    {
      Component: Container,
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
          path: '/auth/password-reset',
          children: [{ path: ':id', Component: PasswordResetPage }],
        },
        {
          path: '/google-auth',
          Component: GoogleAuthRedirectPage,
        },
        {
          path: Pages.ArticlesIndex,
          children: [
            { index: true, Component: ArticlesIndexPage },
            {
              path: ':id',
              Component: ArticleDetailedPage,
            },
          ],
        },
        {
          path: Pages.EventsIndex,
          children: [
            { index: true, Component: EventsPage },
            {
              path: ':id',
              Component: EventsDetailedPade,
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
            { path: 'by-category/:code', Component: CategoryThreadsPage },
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
        {
          path: '/stats',
          children: [
            { index: true, Component: StatsBasePage },
            {
              path: 'seasons',
              children: [
                { index: true, Component: StatsSeasonsPage },
                {
                  path: ':id',
                  Component: StatsSeasonDetailed,
                },
              ],
            },
            {
              path: 'race-events',
              children: [{ path: ':id', Component: StatsEventPage }],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
