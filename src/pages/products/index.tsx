import {
  Center,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const ProductsList = () => {
  return (
    <Center px={2} minH="100vh" bg={'gray.100'}>
      <Flex
        pb={4}
        flexDir="column"
        align="center"
        bg={'white'}
        rounded="6"
        w={['sm', 'md', 'lg', 'xl']}
        boxShadow="lg"
      >
        <Heading
          w={'100%'}
          px={4}
          py={2}
          mb={4}
          as="h2"
          bg={'green.300'}
          roundedTop="6"
        >
          商品一覧
        </Heading>

        <UnorderedList w={'100%'} px={4}>
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
    </Center>
  );
};

export default ProductsList;
