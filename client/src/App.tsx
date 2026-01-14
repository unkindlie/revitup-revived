import { Container } from '@/components/container/Container';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/providers/AuthProvider';
import { RegistrationPage, StartPage } from '@/pages';
import { ErrorBoundary } from './pages/NotFoundErrorBoundary';
import { GoogleAuthRedirectPage } from './pages/auth/GoogleAuthRedirectPage';

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
        }
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
