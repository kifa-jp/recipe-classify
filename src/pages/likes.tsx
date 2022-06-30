import { Box, Container, Heading } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
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
    <Container px={0} pb={10}>
      <Box textAlign={'center'} h={'16'}>
        <Heading as={'h2'} color={'gray.800'} fontSize={24}>
          マイリスト
        </Heading>
      </Box>
      {likeList.map((recipeSummary, key) => (
        <LikesCard key={key} recipeSummary={recipeSummary} clickDeleteButton={() => deleteItem(key)} />
      ))}
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
