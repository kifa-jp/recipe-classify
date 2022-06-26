import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
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
    <Box position={'fixed'} as={'nav'} w={'100%'} bg={'white'} zIndex={1}>
      <Container display={'flex'} px={2} justifyContent={'space-between'} alignItems={'center'}>
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
            <Link>マイリスト</Link>
          </NextLink>
          <NextLink href="/recipes" passHref>
            <Link>レシピを探す</Link>
          </NextLink>
        </Stack>
        <Box ml={2} display={['inline-block', 'none']}>
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" aria-label="Options" h={10} />
            <MenuList>
              <MenuItem>
                <NextLink href="/likes" passHref>
                  <Link>マイリスト</Link>
                </NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/recipes" passHref>
                  <Link>レシピを探す</Link>
                </NextLink>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;
