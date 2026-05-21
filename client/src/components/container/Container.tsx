import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

import { Header } from '@/components/container/header/Header';
import { Footer } from '@/components/container/footer/Footer';

export const Container = () => (
  <main className="flex min-h-screen flex-col">
    <Header />
    <div className="mx-4 my-6 flex min-h-0 flex-1 transition-transform sm:mx-6 md:mx-8 lg:mx-10">
      <Outlet />
    </div>
    <Footer />
    <Toaster richColors toastOptions={{ className: 'font-inter' }} />
  </main>
);
