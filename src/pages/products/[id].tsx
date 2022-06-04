import { useRouter } from 'next/router';
import { Flex, Heading, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import * as fs from 'fs';
import * as path from 'path';

// SSG
// export async function getStaticProps({ params }: { params: any }) {
//   const jsonPath = path.join(process.cwd(), 'public', `${params.id}.json`);
//   const jsonText = fs.readFileSync(jsonPath, 'utf-8');
//   const data = JSON.parse(jsonText);

//   return {
//     props: {
//       product: data,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const jsonPath = path.join(process.cwd(), 'public', `products.json`);
//   const jsonText = fs.readFileSync(jsonPath, 'utf-8');
//   const data = JSON.parse(jsonText);

//   const paths = data.map((product: any) => {
//     return {
//       params: {
//         id: product,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }

// SSR
export async function getServerSideProps({ params }: { params: any }) {
  const jsonPath = path.join(process.cwd(), 'public', `${params.id}.json`);
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(jsonText);

  return {
    props: {
      product: data,
    },
  };
}

const Product = ({ product }: { product: any }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Flex px={2} minH="100vh" alignItems="center" justifyContent="center">
      <Flex p={4} flexDir="column" align="center">
        <Heading m={0} as="h2">
          {id}のページです
        </Heading>
        <Image
          src={product.image}
          alt={product.name}
          width="300"
          height="400"
        />
        <Text>{product.name}</Text>
        <br />
        <NextLink href="/products">
          <Link>商品一覧へ</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Product;
