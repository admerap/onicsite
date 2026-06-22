'use client';
import { Button } from "@/components/ui/button";
import { addItemToCart, clearCart } from "@/lib/actions/cart-actions";
import { Cart, CartItem } from "@/types";
import { Plus, Minus, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useOptimistic, useTransition } from "react";

const AddToCart = ({ cart, item, stock }: { cart?: Cart; item: CartItem; stock: number }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const existItem = cart?.items.find((i) => i.productId === item.productId);
    const [optimisticQty, updateOptimisticQty] = useOptimistic(
        existItem?.qty ?? 0,
        (current, delta: number) => current + delta,
    );

    const handleAddToCart = () => {
        startTransition(async () => {
            updateOptimisticQty(1);
            const response = await addItemToCart(item);
            if (!response.success) {
                toast.error(response.message || "Failed to add item to cart.");
            } else {
                toast.success(response.message || "Item added to cart!", {
                    action: { label: "Go to Cart", onClick: () => router.push("/cart") },
                });
            }
        });
    };

    const handleRemoveFromCart = () => {
        startTransition(async () => {
            updateOptimisticQty(-1);
            const response = await clearCart(item.productId);
            if (!response.success) {
                toast.error(response.message || "Failed to remove item from cart.");
            } else {
                toast.success(response.message || "Item removed from cart.");
            }
        });
    };

    if (optimisticQty > 0) {
        return (
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    className="w-10 h-10 p-0"
                    onClick={handleRemoveFromCart}
                    disabled={isPending}
                >
                    {optimisticQty === 1 ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
                </Button>
                <span className="w-8 text-center font-medium">
                    {isPending
                        ? <Loader2 className="size-4 animate-spin mx-auto" />
                        : optimisticQty}
                </span>
                <Button
                    variant="outline"
                    className="w-10 h-10 p-0"
                    onClick={handleAddToCart}
                    disabled={isPending || optimisticQty >= stock}
                >
                    <Plus className="size-4" />
                </Button>
            </div>
        );
    }

    return (
        <Button
            className="w-full cursor-pointer"
            type="button"
            onClick={handleAddToCart}
            disabled={isPending}
        >
            {isPending
                ? <Loader2 className="mr-2 size-4 animate-spin" />
                : <Plus className="mr-2" />}
            Add to Cart
        </Button>
    );
};

export default AddToCart;
