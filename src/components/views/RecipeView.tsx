import { Center, Flex } from '@chakra-ui/react';
import React from 'react';
import RecipeActions from '../templates/RecipeActions';
import RecipeCard from '../templates/RecipeCard';
import RecipeFooter from '../templates/RecipeFooter';
import RecipeHeader from '../templates/RecipeHeader';

// TODO: コンポーネントごとにpropsに型を付ける
function RecipeView({
  title,
  description,
  cost,
  indication,
  imageUrl,
  recipeUrl,
  likePath,
  disLikePath,
}: {
  title: string;
  description: string;
  cost: string;
  indication: string;
  imageUrl: string;
  recipeUrl: string;
  likePath: string;
  disLikePath: string;
}) {
  return (
    <Center bg={'gray.100'}>
      <Center px={2} h="100vh" w="100vw" maxW={760} bg={'gray.100'}>
        <Flex flexDir="column">
          <RecipeHeader />
          <RecipeCard
            title={title}
            description={description}
            cost={cost}
            indication={indication}
            imageUrl={imageUrl}
            recipeUrl={recipeUrl}
          />
          <RecipeActions likePath={likePath} dislikePath={disLikePath} />
          <RecipeFooter />
        </Flex>
      </Center>
    </Center>
  );
}

export default RecipeView;
