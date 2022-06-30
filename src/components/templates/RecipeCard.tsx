import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

type RecipeCardProps = {
  title: string;
  description: string;
  cost: string;
  indication: string;
  imageUrl: string;
  recipeUrl: string;
};

function RecipeCard({ title, description, cost, indication, imageUrl, recipeUrl }: RecipeCardProps) {
  return (
    <Box p={4} mb={8} boxShadow={'dark-lg'} textAlign="center" rounded={6} bg={'white'} h={450} w="100%">
      <Box mb={3}>
        <Heading as="h2" fontSize={'md'} lineHeight="4" noOfLines={2}>
          {title}
        </Heading>
      </Box>
      <Flex fontSize={'xs'} mb={1} justifyContent="flex-end">
        <Text px={3} mx={1} bg="yellow.500" color="white" fontWeight="bold">
          {cost}
        </Text>
        <Text px={3} mx={1} bg="orange.500" color="white" fontWeight="bold">
          {indication}
        </Text>
      </Flex>
      <Box mb={1} position={'relative'} h={300}>
        {imageUrl && <Image src={imageUrl} alt={title} layout="fill" objectFit="contain" />}
      </Box>
      <Box fontSize={'sm'} mb={1}>
        <Text lineHeight="4" noOfLines={2} mb={1}>
          {description}
        </Text>
        <Flex justifyContent="flex-end">
          <Link href={recipeUrl} target="_blank">
            <Text color="orange.500" fontWeight="bold">
              続きを読む
            </Text>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}

export default RecipeCard;
