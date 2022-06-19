import { Box, Container, Flex, Heading, Link, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import { addLike, deleteLike, getLikeListFromLocalStorage, setLikeListToLocalStorage } from '../utils/likeUtils';

const Likes = () => {
  const testList: LikeList = [
    {
      recipeId: '1860023243',
      url: 'https://recipe.rakuten.co.jp/recipe/1860023243/',
      title: 'ジャガイモとチーズだけ！！【簡単ガレット】 レシピ・作り方 by スコクラさん｜楽天レシピ',
      image: 'https://recipe.r10s.jp/recipe-space/d/strg/ctrl/3/4b97079b047aedb6fee22c664d758e8bbb33a292.47.9.3.3.jpg',
    },
    {
      recipeId: '1860023244',
      url: 'https://recipe.rakuten.co.jp/recipe/1860023243/',
      title: 'ジャガイモとチーズだけ！！【簡単ガレット】 レシピ・作り方 by スコクラさん｜楽天レシピ',
      image: 'https://recipe.r10s.jp/recipe-space/d/strg/ctrl/3/4b97079b047aedb6fee22c664d758e8bbb33a292.47.9.3.3.jpg',
    },
    {
      recipeId: '1860023245',
      url: 'https://recipe.rakuten.co.jp/recipe/1860023243/',
      title: 'ジャガイモとチーズだけ！！【簡単ガレット】 レシピ・作り方 by スコクラさん｜楽天レシピ',
      image: 'https://recipe.r10s.jp/recipe-space/d/strg/ctrl/3/4b97079b047aedb6fee22c664d758e8bbb33a292.47.9.3.3.jpg',
    },
    {
      recipeId: '1860023246',
      url: 'https://recipe.rakuten.co.jp/recipe/1860023243/',
      title: 'ジャガイモとチーズだけ！！【簡単ガレット】 レシピ・作り方 by スコクラさん｜楽天レシピ',
      image: 'https://recipe.r10s.jp/recipe-space/d/strg/ctrl/3/4b97079b047aedb6fee22c664d758e8bbb33a292.47.9.3.3.jpg',
    },
  ];

  setLikeListToLocalStorage(testList);
  const likeList = getLikeListFromLocalStorage();

  return (
    <Container maxW={600} px={2}>
      <Box textAlign={'center'} h={'16'}>
        <Heading as={'h2'} color={'gray.800'}>
          マイリスト
        </Heading>
      </Box>
      {likeList.map((like, key) => (
        <Flex key={key} border={'1px solid'} borderColor={'gray.300'} borderRadius={15} overflow={'hidden'} mb={2}>
          <Box
            w={[65, 100]}
            h={[65, 100]}
            minW={[65, 100]}
            backgroundImage={like.image}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
          />
          <Box p={2}>
            <Link href={like.url} target="_blank">
              <Text fontSize={'md'} fontWeight={'bold'} lineHeight={'5'} color={'gray.800'} noOfLines={2}>
                {like.title}
              </Text>
            </Link>
          </Box>
        </Flex>
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
