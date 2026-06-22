"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";

// Calculate cart prices
const calcPrices = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0),
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(Number(itemsPrice) * 0.15),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("No active cart session found.");

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });
    if (!product) throw new Error("Product not found.");

    const cart = await getMyCart();

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrices([item]),
      });
      await prisma.cart.create({
        data: {
          userId: newCart.userId ?? undefined,
          sessionCartId: newCart.sessionCartId,
          items: newCart.items,
          itemsPrice: newCart.itemsPrice,
          totalPrice: newCart.totalPrice,
          taxPrice: newCart.taxPrice,
          shippingPrice: newCart.shippingPrice,
        } as Prisma.CartUncheckedCreateInput,
      });
      revalidatePath(`/product/${product.slug}`);
      return { success: true, message: `${product.name} added to cart` };
    } else {
      const existingItem = (cart.items as CartItem[]).find(
        (i) => i.productId === item.productId,
      );

      const updatedItems = existingItem
        ? (cart.items as CartItem[]).map((i) =>
            i.productId === item.productId ? { ...i, qty: i.qty + 1 } : i,
          )
        : [...(cart.items as CartItem[]), item];

      if (existingItem && product.stock < existingItem.qty + 1) {
        throw new Error("Not enough stock available.");
      }
      if (!existingItem && product.stock < 1) {
        throw new Error("Product is out of stock.");
      }

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: updatedItems,
          ...calcPrices(updatedItems),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: existingItem
          ? `${product.name} quantity updated`
          : `${product.name} added to cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error) || "Failed to add item to cart.",
    };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) return undefined;

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });
  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function clearCart(productId: string) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("No active cart session found.");
    // Get product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found.");
    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found.");
    // Check for item in cart
    const exist = (cart.items as CartItem[]).find(
      (i) => i.productId === productId,
    );
    if (!exist) throw new Error("Item not found in cart.");
    // Check if only 1 item in cart
    if (exist.qty === 1) {
      // Remove item from cart
      cart.items = (cart.items as CartItem[]).filter(
        (i) => i.productId !== exist.productId,
      );
    } else {
      // Decrease item quantity by 1
      (cart.items as CartItem[]).find(
        (i) => i.productId === exist.productId,
      )!.qty -= 1;
    }

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrices(cart.items as CartItem[]),
      },
    });
    revalidatePath(`/product/${product.slug}`);
    return { success: true, message: `${product.name} removed from cart` };
  } catch (error) {
    return {
      success: false,
      message: formatError(error) || "Failed to clear cart.",
    };
  }
}
