import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';

type LikesCardProps = {
  key: number;
  recipeSummary: RecipeSummary;
  clickDeleteButton: () => void;
  updateStar: (star: boolean) => void;
};

const LikesCard = ({ key, recipeSummary, clickDeleteButton, updateStar }: LikesCardProps) => {
  const [star, setStar] = useState(recipeSummary.star);
  const clickStar = () => {
    const newStar = !star;
    setStar(newStar);
    updateStar(newStar);
  };

  return (
    <Box key={key} position={'relative'} borderBottom={'1px solid'} borderColor={'gray.200'} overflow={'hidden'}>
      <Box w={'100%'}>
        <Link href={recipeSummary.url} target="_blank" _hover={{ textDecor: 'none' }}>
          <Flex
            py={1}
            transitionDuration="0.2s"
            color={'gray.800'}
            _hover={{ bg: 'gray.50', color: 'gray.600', textDecor: 'none' }}
            _active={{ bg: 'gray.100' }}
          >
            <Box
              w={[65, 100]}
              h={[65, 100]}
              minW={[65, 100]}
              backgroundImage={recipeSummary.image}
              backgroundSize={'cover'}
              backgroundPosition={'center'}
            />
            <Box px={2} py={1} mr={5}>
              <Text fontSize={['md', 'lg']} fontWeight={'bold'} lineHeight={['4', '6']} noOfLines={2}>
                {recipeSummary.title}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Box>
      <Flex position={'absolute'} bottom="1" left={[73, 108]}>
        <Box pr={3}>
          <Button size={'xs'} p={0} bg={'whiteAlpha.500'} verticalAlign={'top'} onClick={clickStar}>
            {star ? <AiFillStar size={20} color={'#fbc102'} /> : <AiOutlineStar size={20} color={'#333'} />}
          </Button>
        </Box>
        <Box pr={3}>
          <Button size={'xs'} p={0} bg={'whiteAlpha.500'} verticalAlign={'top'}>
            <EditIcon w={'4'} h={'4'} color={'#333'} />
          </Button>
        </Box>
        <Box pr={3}>
          <Button size={'xs'} p={0} bg={'whiteAlpha.500'} verticalAlign={'top'}>
            <FiShare size={16} color={'#333'} />
          </Button>
        </Box>
      </Flex>
      <Box position={'absolute'} top="1" right="1">
        <Button
          size={'xs'}
          p={0}
          rounded={'full'}
          color={'gray.500'}
          bg={'blackAlpha.100'}
          verticalAlign={'top'}
          onClick={clickDeleteButton}
        >
          <CloseIcon w={'2.5'} h={'2.5'} />
        </Button>
      </Box>
    </Box>
  );
};

export default LikesCard;
