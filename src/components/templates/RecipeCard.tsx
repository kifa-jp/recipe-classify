import { Box, Center, Flex, Heading, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import ReactLoading from 'react-loading';

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
      <Box mb={3} h={8}>
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
      <Center position={'relative'} h={280} my={3}>
        {imageUrl.length === 0 ? (
          <ReactLoading type="spin" color="#3182ce" />
        ) : (
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" priority={true} />
        )}
      </Center>
      <Box fontSize={'sm'} mb={1} h={8}>
        <Text lineHeight="4" noOfLines={2} mb={1}>
          {description}
        </Text>
        <Flex justifyContent="flex-end">
          {recipeUrl.length !== 0 && (
            <Link href={recipeUrl} target="_blank">
              <Text color="orange.500" fontWeight="bold">
                続きを読む
              </Text>
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default RecipeCard;
