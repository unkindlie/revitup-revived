import { Header } from '@/components/container/header/Header';
import { Footer } from '@/components/container/footer/Footer';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export const Container = () => (
  <main className="flex min-h-screen flex-col">
    <Header />
    <div className="mx-8 my-4 flex min-h-0 flex-1 md:mx-10">
      <Outlet />
    </div>
    <Footer />
    <Toaster richColors toastOptions={{ className: 'font-inter' }} />
  </main>
);
