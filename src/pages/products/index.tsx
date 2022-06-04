import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const ProductsList = () => {
  return (
    <Flex px={2} minH="100vh" alignItems="center" justifyContent="center">
      <Flex p={4} flexDir="column" align="center">
        <Heading m={0} as="h2">
          商品一覧
        </Heading>

        <UnorderedList>
          <ListItem>
            <NextLink href="/products/smartphone">
              <Link>スマートフォン</Link>
            </NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/products/pc">
              <Link>パソコン</Link>
            </NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/products/headphone">
              <Link>ヘッドホン</Link>
            </NextLink>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
};

export default ProductsList;
