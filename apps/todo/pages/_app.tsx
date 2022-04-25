/* eslint-disable react/jsx-props-no-spreading */
import { AppShell, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ToDoAppHeader from '../components/header/header';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ToDo App</title>
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
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
