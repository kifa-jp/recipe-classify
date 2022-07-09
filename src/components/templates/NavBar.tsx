import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import React from 'react';
import Logo from '../parts/Logo';

const NavBar = () => {
  return (
    <Box position={'fixed'} as={'nav'} w={'100%'} bg={'white'} zIndex={1} borderBottom={'1px'} borderColor={'gray.100'}>
      <Container display={'flex'} px={2} h={12} justifyContent={'space-between'} alignItems={'center'}>
        <Flex align={'center'} mr={5}>
          <Heading as="h1" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>
        <Stack
          direction={['column', 'row']}
          display={['none', 'flex']}
          w={['full', 'auto']}
          alignItems="center"
          flexGrow={1}
          mt={[4, 0]}
        >
          <NextLink href="/likes" passHref>
            <Box rounded={10} p={2} _hover={{ bg: 'gray.50' }} as={'a'}>
              食べたいリスト
            </Box>
          </NextLink>
          <NextLink href="/recipes" passHref>
            <Box rounded={10} p={2} _hover={{ bg: 'gray.50' }} as={'a'}>
              レシピを探す
            </Box>
          </NextLink>
        </Stack>
        <Box ml={2} display={['inline-block', 'none']}>
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" aria-label="Options" h={10} />
            <MenuList>
              <NextLink href="/likes" passHref>
                <MenuItem as={'a'}>食べたいリスト</MenuItem>
              </NextLink>
              <NextLink href="/recipes" passHref>
                <MenuItem as={'a'}>レシピを探す</MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;
