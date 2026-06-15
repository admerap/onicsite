import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

const HomePage = () => {
  return (
    <>
      <ProductList data={sampleData.products} title="New Arrivals" limit={4} />
    </>
  );
};

export default HomePage;