import { Box, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

function RecipeCard({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
  return (
    <Box p={4} mb={8} boxShadow={'lg'} textAlign="center" rounded={6} bg={'white'} h={500} w={'95vw'} maxW={600}>
      <Box h={'8%'} m={0}>
        <Heading as="h2" fontSize={'md'} lineHeight="4" noOfLines={2}>
          {title}
        </Heading>
      </Box>
      <Box h={'12%'}>
        <Text fontSize={'sm'} lineHeight="4" noOfLines={3}>
          {description}
        </Text>
      </Box>
      <Box position={'relative'} h={'80%'}>
        {/* <Image src={imageUrl} alt={title} width={600} height={450} objectFit="contain" /> */}
        <Image src={imageUrl} alt={title} layout="fill" objectFit="contain" />
      </Box>
    </Box>
  );
}

export default RecipeCard;
