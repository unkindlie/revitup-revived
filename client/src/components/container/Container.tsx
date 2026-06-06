import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

import { Header } from '@/components/container/header/Header';
import { Footer } from '@/components/container/footer/Footer';
import { ArticleRandom } from './sided/ArticleRandom';
import { LatestThreads } from './sided/LatestThreads';

export const Container = () => (
  <main className="flex min-h-screen flex-col">
    <Header />

    <div className="mx-4 my-6 flex flex-1 flex-col gap-4 transition-transform lg:mx-10 lg:flex-row">
      <aside className="hidden w-full lg:block lg:w-56">
        <ArticleRandom />
      </aside>

      <section className="min-w-0 flex-1">
        <Outlet />
      </section>

      <aside className="hidden w-full justify-end lg:flex lg:w-56">
        <LatestThreads />
      </aside>
    </div>

    <Footer />

    <Toaster richColors toastOptions={{ className: 'font-inter' }} />
  </main>
);
