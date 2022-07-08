import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BsCardList } from 'react-icons/bs';
import NextLink from 'next/link';

const LikesEmpty = () => {
  return (
    <Center h={'92vh'}>
      <Stack align={'center'} textAlign={'center'} px={4} pb={10}>
        <Box>
          <BsCardList color="#444" size={'200'} />
        </Box>
        <Box pb={4}>
          <Text>レシピを探してあなただけの食べたいリストを完成させましょう！</Text>
        </Box>
        <Box pb={4}>
          <NextLink href={'/recipes'} passHref>
            <Button colorScheme={'blue'} as="a">
              レシピを探す
            </Button>
          </NextLink>
        </Box>
      </Stack>
    </Center>
  );
};

export default LikesEmpty;
