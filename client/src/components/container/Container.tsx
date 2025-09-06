import { Header } from '@/components/container/header/Header';
import { Footer } from '@/components/container/footer/Footer';
import { Outlet } from 'react-router';

export const Container = () => (
  <main className="flex min-h-screen flex-col">
    <Header />
    <div className="mx-8 my-4 flex-grow">
      <Outlet />
    </div>
    <Footer />
  </main>
);
