import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import NavBar from '../templates/NavBar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box as="main">
      <Head>
        <link rel="icon" href="/logo_32_gray.png" />
        <title>何食べたい？</title>
      </Head>
      <NavBar />
      <Container pt={10}>{children}</Container>
    </Box>
  );
};

export default MainLayout;
