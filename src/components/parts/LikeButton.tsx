import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import NextLink from 'next/link';

function LikeButton({ href }: { href: string }) {
  return (
    <NextLink href={href} passHref>
      <Button bg={'red.500'} color="white" w={'100%'} _hover={{ bg: 'red.400' }} _active={{ bg: 'red.400' }} as="a">
        <Box p={0.8}>
          <AiFillHeart />
        </Box>
        <Box as="span" ml={1} p={0.8}>
          Like
        </Box>
      </Button>
    </NextLink>
  );
}

export default LikeButton;
