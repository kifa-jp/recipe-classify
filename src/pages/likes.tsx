import { Box, Button, Container, Flex, Heading, Spacer } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import LikesCard from '../components/templates/LikesCard';
import { deleteLike, getLikeList, getRecipeSummary, updateLike } from '../utils/likeUtils';

type Filter = 'all' | 'star';

const Likes = () => {
  const [likeList, setLikeList] = useState(getLikeList());
  const [filter, setFilter] = useState<Filter>('all');

  const deleteItem = (recipeId: number) => {
    deleteLike(recipeId);
    setLikeList(getLikeList());
  };

  const updateStar = (recipeId: number, star: boolean) => {
    const newLike = getRecipeSummary(recipeId);
    if (!newLike) {
      console.log('recipeId is not found in localStrage');
      return;
    }
    newLike.star = star;
    updateLike(recipeId, newLike);
    setLikeList(getLikeList());
  };

  const filteredLikeList = likeList.filter((recipeSummary) => {
    switch (filter) {
      case 'all':
        return recipeSummary;
      case 'star':
        return recipeSummary.star;
      default:
        return recipeSummary;
    }
  });

  return (
    <Container px={0} pb={10}>
      <Flex alignItems={'center'} py={2}>
        <Box px={3}>
          <Heading as={'h2'} color={'gray.800'} fontSize={20}>
            食べたいリスト
          </Heading>
        </Box>
        <Spacer />
        <Box px={1}>
          <Flex>
            <Box px={1}>
              <Button colorScheme={filter === 'all' ? 'blue' : 'gray'} h={8} onClick={() => setFilter('all')}>
                All
              </Button>
            </Box>
            <Box px={1}>
              <Button h={8} colorScheme={filter === 'star' ? 'blue' : 'gray'} onClick={() => setFilter('star')}>
                Star
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
      {filteredLikeList.map((recipeSummary) => (
        <LikesCard
          key={recipeSummary.recipeId}
          recipeSummary={recipeSummary}
          clickDeleteButton={() => deleteItem(recipeSummary.recipeId)}
          updateStar={(star) => updateStar(recipeSummary.recipeId, star)}
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
