import { Center, Flex, Heading, Link, Grid, GridItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as fs from 'fs';
import * as path from 'path';
import { GetServerSideProps } from 'next';
import { randomDisplayPath } from '../../utils/recipeUtils';

export const getServerSideProps: GetServerSideProps = async () => {
  const jsonPath = path.join(process.cwd(), 'public', 'category.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(jsonText);

  return {
    redirect: {
      permanent: false,
      destination: randomDisplayPath(data),
    },
  };
};

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
        <Heading w={'100%'} px={4} py={2} mb={4} as="h2" bg={'green.300'} roundedTop="6">
          カテゴリ一覧
        </Heading>
        <Grid templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={2} px={4}>
          {categoryList.large.map((category) => (
            <GridItem w={'100%'} key={category.categoryId} px={4}>
              <NextLink href={`/recipes/${category.categoryId}/0`} passHref>
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
