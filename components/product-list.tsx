import { ProductWithCount } from "pages";
import useSWR from "swr";

import Item from "./item";
import Layout from "./layout";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}
interface Record {
  id: number;
  product: ProductWithCount;
}
interface ProductListResponse {
  [key: string]: Record[];
}

const ProductList = ({ kind }: ProductListProps) => {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  if (!data) {
    return <p>상품이 없습니다</p>;
  }
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col pb-10 space-y-5 divide-y">
        {data?.[kind]?.map((record) => (
          <Item
            id={record.product.id}
            key={record.id}
            title={record.product.name}
            price={record.product.price}
            comments={1}
            hearts={record.product._count.favs}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ProductList;
