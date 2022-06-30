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
    <Center px={2} h="92vh">
      <Flex flexDir="column" w="100%">
        <RecipeCard {...recipeCardProps} />
        <RecipeActions {...recipeActionsProps} />
        <RecipeFooter />
      </Flex>
    </Center>
  );
}

export default RecipeView;
