import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";

import FloatingButton from "components/floating-button";
import Item from "components/item";
import Layout from "components/layout";

import useUser from "libs/client/useUser";

interface ProductWithFavCount extends Product {
  _count: {
    favs: number;
  };
}
interface ProductsResponse {
  ok: boolean;
  products: ProductWithFavCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  const { data } = useSWR<ProductsResponse>("/api/products");

  console.log(data);

  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            comments={0}
            hearts={product._count.favs}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
