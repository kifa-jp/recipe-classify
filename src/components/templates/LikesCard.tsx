import { SmallCloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

type LikesCardProps = {
  key: number;
  recipeSummary: RecipeSummary;
  clickDeleteButton: () => void;
};

const LikesCard = ({ key, recipeSummary, clickDeleteButton }: LikesCardProps) => {
  return (
    <Box
      key={key}
      position={'relative'}
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={10}
      overflow={'hidden'}
      mb={1}
      boxShadow={'md'}
    >
      <Box w={'100%'}>
        <Link href={recipeSummary.url} target="_blank">
          <Flex _hover={{ bg: 'orange.50' }} _active={{ bg: 'orange.50' }}>
            <Box
              w={[65, 100]}
              h={[65, 100]}
              minW={[65, 100]}
              backgroundImage={recipeSummary.image}
              backgroundSize={'cover'}
              backgroundPosition={'center'}
            />
            <Box p={2} mr={4}>
              <Text fontSize={'md'} fontWeight={'bold'} lineHeight={'5'} color={'gray.800'} noOfLines={2}>
                {recipeSummary.title}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Box>
      <Box position={'absolute'} top="0" right="0">
        <Button size={'xs'} p={0} colorScheme={'gray'} verticalAlign={'top'} onClick={clickDeleteButton}>
          <SmallCloseIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default LikesCard;
