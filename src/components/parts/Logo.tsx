import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { ImSpoonKnife } from 'react-icons/im';

const Logo = () => {
  return (
    <Link href="/" passHref>
      <Flex fontSize={18} alignItems="center" h={10} p={2} as={'a'}>
        <Text color={useColorModeValue('gray.800', 'whiteAlpha.900')}>
          <ImSpoonKnife />
        </Text>
        <Text color={useColorModeValue('gray.800', 'whiteAlpha.900')} ml={2}>
          何食べたい？
        </Text>
      </Flex>
    </Link>
  );
};

export default Logo;
