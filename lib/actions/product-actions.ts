"use server";

import { Product } from "@/types";
import prisma from "@/lib/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_PRODUCTS_LIMIT,
  });
  return convertToPlainObject(data) as unknown as Product[];
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await prisma.product.findUnique({
    where: { slug: slug },
  });
  return convertToPlainObject(data) as unknown as Product | null;
}
