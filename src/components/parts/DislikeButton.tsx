import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { AiFillDislike } from 'react-icons/ai';
import NextLink from 'next/link';

function DislikeButton({ href }: { href: string }) {
  return (
    <NextLink href={href} passHref>
      <Button bg={'gray.500'} color="white" w={'100%'} _hover={{ bg: 'gray.400' }} _active={{ bg: 'gray.400' }} as="a">
        <Box p={0.8}>
          <AiFillDislike />
        </Box>
        <Box as="span" ml={1} p={0.8}>
          Dislike
        </Box>
      </Button>
    </NextLink>
  );
}

export default DislikeButton;
