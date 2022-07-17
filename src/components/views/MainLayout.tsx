import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import NavBar from '../templates/NavBar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box as="main">
      <Head>
        <meta name="theme-color" content="#f69435" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
        <title>何食べたい？</title>
      </Head>
      <NavBar />
      <Container pt={12} px={0}>
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
