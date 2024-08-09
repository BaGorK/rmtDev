// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import BookmarkProvider from './contexts/BookmarkProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <BookmarkProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position='top-center' />
        <ReactQueryDevtools initialIsOpen={false} />

        <App />
      </QueryClientProvider>
    </BookmarkProvider>
  </>
);
