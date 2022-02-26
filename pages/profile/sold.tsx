import type { NextPage } from "next";

import Layout from "components/layout";
import ProductList from "components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col pb-10 space-y-5 divide-y">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
