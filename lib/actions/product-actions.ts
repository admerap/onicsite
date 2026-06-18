"use server";

import prisma from "@/lib/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_PRODUCTS_LIMIT,
  });
  return convertToPlainObject(data);
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findUnique({
    where: { slug: slug },
  });
  return convertToPlainObject(data);
}
