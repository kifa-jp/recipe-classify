import {
  Center,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  Link,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import * as fs from 'fs';
import * as path from 'path';

// SSR
export async function getServerSideProps() {
  const jsonPath = path.join(process.cwd(), 'public', 'category.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(jsonText);

  return {
    props: {
      categoryList: data,
    },
  };
}

type CategoryList = {
  large: Array<LargeCategory>;
  medium: Array<MediumCategory>;
};

type LargeCategory = {
  categoryId: string;
  categoryName: string;
  categoryUrl: string;
};

type MediumCategory = {
  categoryId: number;
  categoryName: string;
  categoryUrl: string;
  parentCategoryId: string;
};

// TODO: フォルダ名をproductsから変更
const CategoryList = ({ categoryList }: { categoryList: CategoryList }) => {
  return (
    <Center px={2} minH="100vh" bg={'gray.100'}>
      <Flex
        pb={4}
        flexDir="column"
        align="center"
        bg={'white'}
        rounded="6"
        w={['350px', '640px', '800px', '960px']}
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
          カテゴリ一覧
        </Heading>
        <Grid
          templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']}
          gap={2}
          px={4}
        >
          {categoryList.large.map((category) => (
            <GridItem w={'100%'} key={category.categoryId} px={4}>
              <NextLink
                href={`/products/${category.categoryId}?rank=0`}
                passHref
              >
                <Link>{category.categoryName}</Link>
              </NextLink>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Center>
  );
};

export default CategoryList;
