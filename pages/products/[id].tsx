import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import Button from "components/button";
import Layout from "components/layout";

import useMutation from "libs/client/useMutation";
import useUser from "libs/client/useUser";
import { cls } from "libs/client/utils";

interface ProductWithUser extends Product {
  user: Pick<User, "avatar" | "name" | "id">;
}
interface ProductResponse {
  ok: boolean;
  product: ProductWithUser;
  isLiked: boolean;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();

  // const { mutate } = useSWRConfig(); // 다른 주소에 걸린 캐쉬 변형 가능
  const { data, mutate: boundMutate } = useSWR<ProductResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null,
  );

  const [toggleFav] = useMutation(
    router.query.id ? `/api/products/${router.query.id}/fav` : "",
  );

  const handleFavClick = async () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleFav({});
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
  };

  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex items-center py-3 space-x-3 border-t border-b cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="block mt-3 text-2xl text-gray-900">{`$${data?.product?.price}`}</span>
            <p className="my-6 text-gray-700 ">{data?.product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={handleFavClick}
                className={cls(
                  "p-3 rounded-md flex items-center justify-center",
                  data?.isLiked
                    ? "text-red-500 hover:bg-red-100 hover:text-red-600"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-500",
                )}
              >
                {data?.isLiked ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 "
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">비슷한 아이템</h2>
          <div className="grid grid-cols-2 gap-4 mt-6 ">
            {data?.relatedProducts?.map((product, i) => (
              <Link key={product.id} href={`/products/${product?.id}`}>
                <a>
                  <div className="w-full h-56 mb-4 bg-slate-300" />
                  <h3 className="-mb-1 text-gray-700">{product?.name}</h3>
                  <span className="text-sm font-medium text-gray-900">{`$${product?.price}`}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
