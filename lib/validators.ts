import z from "zod";
import { formatNumberWithDecimal } from "./utils";
const currency = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{1,2})?$/.test(formatNumberWithDecimal(Number(val))),
    {
      message: "Price must be a valid number with up to 2 decimal places",
    },
  );
// Schema for inserting a new product
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  brand: z.string().min(3, "Brand must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  stock: z.coerce
    .number()
    .int()
    .nonnegative("Stock must be a non-negative integer"),
  images: z
    .array(
      z
        .string()
        .refine((val) => val.startsWith("/") || /^https?:\/\//.test(val), {
          message:
            "Each image must be a valid URL or an absolute path starting with /",
        }),
    )
    .min(1, "At least one image is required"),
  isFeatured: z.boolean().optional(),
  banner: z.string().url("Banner must be a valid URL").nullable().optional(),
  price: currency,
});

// Schema for sign-in form
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
