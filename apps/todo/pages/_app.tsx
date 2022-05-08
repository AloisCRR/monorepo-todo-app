/* eslint-disable react/jsx-props-no-spreading */
import { AppShell, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToDoAppHeader from '../components/header/header';

type AppProperties<P = unknown> = {
  pageProps: P;
} & Omit<AppProps<P>, 'pageProps'>;

function App({
  Component,
  pageProps
}: AppProperties<{ dehydratedState: unknown }>) {
  const router = useRouter();

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const publicRoutes = ['/authentication'];

    const token = localStorage.getItem('jwt-monorepo-app');

    if (!publicRoutes.includes(router.pathname) && !token) {
      router
        .replace({
          pathname: '/authentication',
          query: { returnUrl: router.pathname }
        })
        .then(() => {
          toast.error('Please login/register to access previous page');
        })
        .catch(() => {
          toast.error('Change route error');
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Monorepo ToDo App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark'
        }}
      >
        <AppShell header={<ToDoAppHeader />}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
          <ToastContainer />
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
