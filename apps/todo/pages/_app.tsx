/* eslint-disable react/jsx-props-no-spreading */
import { AppShell, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
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

  const effect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

  effect(() => {
    const publicRoutes = ['/authentication', '/'];

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
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>Monorepo ToDo App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#1a1b1e"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#1a1b1e" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
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
          <ToastContainer autoClose={2000} />
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
