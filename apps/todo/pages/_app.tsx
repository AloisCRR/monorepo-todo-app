/* eslint-disable react/jsx-props-no-spreading */
import { AppShell, Footer, Header, Title } from '@mantine/core';
import type { AppProps } from 'next/app';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell
      header={
        <Header height={60}>
          <Title align="center" order={3}>
            ToDo App
          </Title>
        </Header>
      }
      footer={<Footer height={60}>Footer</Footer>}
    >
      <Component {...pageProps} />
    </AppShell>
  );
}

export default App;
