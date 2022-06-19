import { Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import LikeButton from '../parts/LikeButton';
import DislikeButton from '../parts/DislikeButton';
import { addLike } from '../../utils/likeUtils';

type RecipeActionsProps = { likePath: string; dislikePath: string; recipeSummary: RecipeSummary };

function RecipeActions({ likePath, dislikePath, recipeSummary }: RecipeActionsProps) {
  return (
    <Flex w={'100%'} mb={8}>
      <Spacer />
      <Box w={'35%'} textAlign="center">
        <DislikeButton href={dislikePath} />
      </Box>
      <Spacer />
      <Box w={'35%'} textAlign="center" onClick={() => addLike(recipeSummary)}>
        <LikeButton href={likePath} />
      </Box>
      <Spacer />
    </Flex>
  );
}

export default RecipeActions;
