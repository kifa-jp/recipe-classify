import { Box, Container, Flex, Heading, Link, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import React from 'react';
import { getLikeList } from '../utils/likeUtils';

const Likes = () => {
  const likeList = getLikeList();

  return (
    <Container maxW={600} px={2}>
      <Box textAlign={'center'} h={'16'}>
        <Heading as={'h2'} color={'gray.800'}>
          マイリスト
        </Heading>
      </Box>
      {likeList.map((recipeSummary, key) => (
        <Flex key={key} border={'1px solid'} borderColor={'gray.300'} borderRadius={15} overflow={'hidden'} mb={2}>
          <Box
            w={[65, 100]}
            h={[65, 100]}
            minW={[65, 100]}
            backgroundImage={recipeSummary.image}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
          />
          <Box p={2}>
            <Link href={recipeSummary.url} target="_blank">
              <Text fontSize={'md'} fontWeight={'bold'} lineHeight={'5'} color={'gray.800'} noOfLines={2}>
                {recipeSummary.title}
              </Text>
            </Link>
          </Box>
        </Flex>
      ))}
      <Box textAlign={'center'}>
        <NextLink href="./recipes" passHref>
          <Link>レシピを探す</Link>
        </NextLink>
      </Box>
    </Container>
  );
};

const DynamicLikes = dynamic(
  {
    loader: async () => Likes,
  },
  { ssr: false },
);

export default DynamicLikes;
