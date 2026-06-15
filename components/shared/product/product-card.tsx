import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./product-price";

const ProductCard = ({ product }: { product: any }) => {
    return (
        <Card className="mx-auto w-full max-w-sm sm:mx-0">
            <CardHeader className="p-0 items-center">
                <Link href={`/product/${product.slug}`}>
                    <div className="overflow-hidden rounded-t-md">
                        <Image src={product.images[0]} alt={product.name} width={300} height={300} className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-110 active:scale-110 animate-zoom-in" />
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="grid gap-3 p-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</div>
                <Link href={`/product/${product.slug}`}>
                    <h2 className="line-clamp-2 min-h-14 text-base font-semibold leading-snug hover:underline md:text-lg">{product.name}</h2>
                </Link>
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="text-sm text-muted-foreground">{product.rating} Stars</p>
                    {product.stock > 0 ? (
                        <ProductPrice value={product.price} currency="$" />
                    ) : (
                        <p className="text-sm font-semibold text-red-600">Out of Stock</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;