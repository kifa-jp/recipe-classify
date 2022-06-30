import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

function DislikeButton({ href }: { href: string }) {
  return (
    <NextLink href={href} passHref>
      <Button bg={'gray.500'} color="white" w={'100%'} _hover={{ bg: 'gray.400' }} _active={{ bg: 'gray.400' }} as="a">
        <Box as="span" ml={1} p={0.8}>
          スキップ
        </Box>
      </Button>
    </NextLink>
  );
}

export default DislikeButton;
