import { Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import LikeButton from '../parts/LikeButton';
import DislikeButton from '../parts/DislikeButton';

function RecipeActions({ likePath, dislikePath }: { likePath: string; dislikePath: string }) {
  return (
    <Flex w={'100%'} mb={8}>
      <Spacer />
      <Box w={'35%'} textAlign="center">
        <DislikeButton href={dislikePath} />
      </Box>
      <Spacer />
      <Box w={'35%'} textAlign="center">
        <LikeButton href={likePath} />
      </Box>
      <Spacer />
    </Flex>
  );
}

export default RecipeActions;
