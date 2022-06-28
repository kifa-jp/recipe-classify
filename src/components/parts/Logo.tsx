import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/" passHref>
      <Flex fontSize={18} alignItems="center" h={10} p={2} as={'a'}>
        <Image src="/logo_32.png" width={20} height={20} alt="logo" />
        <Text color={useColorModeValue('gray.800', 'whiteAlpha.900')} ml={2}>
          何食べたい？
        </Text>
      </Flex>
    </Link>
  );
};

export default Logo;
