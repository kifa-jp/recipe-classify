import React from 'react';
import { Link, Box, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';

function RecipeHeader() {
  return (
    <Flex justifyContent={'flex-end'} mb={4}>
      <Box px={2}>
        <NextLink href="../../likes" passHref>
          <Link>マイリスト</Link>
        </NextLink>
      </Box>
      <Box px={2}>
        <NextLink href="/recipes" passHref>
          <Link>カテゴリ一覧</Link>
        </NextLink>
      </Box>
    </Flex>
  );
}

export default RecipeHeader;
