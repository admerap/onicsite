import { notFound } from "next/navigation";
import Image from "next/image";
import sampleData from "@/db/sample-data";
import ProductPrice from "@/components/shared/product/product-price";
export async function generateStaticParams() {
  return sampleData.products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = sampleData.products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              width={600}
              height={600}
              className="mt-4 w-full h-auto object-cover rounded-xl"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {product.brand} &mdash; {product.category}
          </p>
          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{product.rating} Stars</span>
            <span>&bull;</span>
            <span>{product.numReviews} reviews</span>
          </div>
          <ProductPrice value={product.price} currency="$" />
          <p className="text-muted-foreground">{product.description}</p>
          <p className={product.stock > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>
        </div>
      </div>
    </section>
  );
}
