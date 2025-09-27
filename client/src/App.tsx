import { Container } from '@/components/container/Container';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StartPage } from './pages/StartPage';
import { AuthProvider } from '@/providers/AuthProvider';

const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: false } },
});

function App() {
  const router = createBrowserRouter([
    {
      element: <Container />,
      children: [
        {
          path: '/',
          element: <StartPage />,
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
