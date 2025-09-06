import UserService from '@/api/services/user.service';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/container/Container';
import { createBrowserRouter, RouterProvider } from 'react-router';

function App() {
  const cb = () => {
    UserService.getUsers();
  };

  const router = createBrowserRouter([
    {
      element: <Container />,
      children: [
        {
          path: '/',
          element: (
            <Button className="cursor-pointer" onClick={cb}>
              Click
            </Button>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
