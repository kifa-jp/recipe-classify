import { Center, Flex } from '@chakra-ui/react';
import React from 'react';
import RecipeActions from '../templates/RecipeActions';
import RecipeCard from '../templates/RecipeCard';
import RecipeFooter from '../templates/RecipeFooter';

type RecipeCardProps = React.ComponentProps<typeof RecipeCard>;
type RecipeActionsProps = React.ComponentProps<typeof RecipeActions>;
type RecipeViewProps = {
  recipeCardProps: RecipeCardProps;
  recipeActionsProps: RecipeActionsProps;
};

function RecipeView({ recipeCardProps, recipeActionsProps }: RecipeViewProps) {
  return (
    <Center bg={'gray.100'}>
      <Center px={2} h="94vh" w="100vw" maxW={760} bg={'gray.100'}>
        <Flex flexDir="column">
          <RecipeCard {...recipeCardProps} />
          <RecipeActions {...recipeActionsProps} />
          <RecipeFooter />
        </Flex>
      </Center>
    </Center>
  );
}

export default RecipeView;
