import { Box, Container, Heading, Link } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import React, { useState } from 'react';
import LikesCard from '../components/templates/LikesCard';
import { deleteLike, getLikeList } from '../utils/likeUtils';

const Likes = () => {
  const [likeList, setLikeList] = useState(getLikeList());

  const deleteItem = (index: number) => {
    deleteLike(likeList[index].recipeId);
    setLikeList(getLikeList());
  };

  return (
    <Container maxW={600} px={2}>
      <Box textAlign={'center'} h={'16'}>
        <Heading as={'h2'} color={'gray.800'}>
          マイリスト
        </Heading>
      </Box>
      {likeList.map((recipeSummary, key) => (
        <LikesCard key={key} recipeSummary={recipeSummary} clickDeleteButton={() => deleteItem(key)} />
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
