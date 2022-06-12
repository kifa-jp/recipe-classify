import React from 'react';
import { Link, Box } from '@chakra-ui/react';
import NextLink from 'next/link';

function RecipeHeader() {
  return (
    <Box textAlign={'right'} mb={4}>
      <NextLink href="/products" passHref>
        <Link>カテゴリ一覧へ</Link>
      </NextLink>
    </Box>
  );
}

export default RecipeHeader;
