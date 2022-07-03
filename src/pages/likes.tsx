import { Box, Container, Heading } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import LikesCard from '../components/templates/LikesCard';
import { deleteLike, getLikeList, updateLike } from '../utils/likeUtils';

const Likes = () => {
  const [likeList, setLikeList] = useState(getLikeList());

  const deleteItem = (index: number) => {
    deleteLike(likeList[index].recipeId);
    setLikeList(getLikeList());
  };

  const updateStar = (index: number, star: boolean) => {
    const newLike: RecipeSummary = {
      recipeId: likeList[index].recipeId,
      url: likeList[index].url,
      title: likeList[index].title,
      image: likeList[index].image,
      star: star,
    };
    updateLike(likeList[index].recipeId, newLike);
  };

  return (
    <Container px={0} pb={10}>
      <Box textAlign={'center'} py={4}>
        <Heading as={'h2'} color={'gray.800'} fontSize={20}>
          食べたいリスト
        </Heading>
      </Box>
      {likeList.map((recipeSummary, key) => (
        <LikesCard
          key={key}
          recipeSummary={recipeSummary}
          clickDeleteButton={() => deleteItem(key)}
          updateStar={(star) => updateStar(key, star)}
        />
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
