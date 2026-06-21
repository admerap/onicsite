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
  banner: z.url("Banner must be a valid URL").nullable().optional(),
  price: currency,
});

// Schema for sign-in form
export const signInSchema = z.object({
  email: z.email("Invalid email address").transform((v) => v.trim().toLowerCase()),
  password: z.string().min(1, "Password is required"),
});

// Schema for sign-up form
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long")
      .trim(),
    email: z.email("Invalid email address").transform((v) => v.trim().toLowerCase()),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .check(
        z.regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
        z.regex(/[a-z]/, "Password must contain at least one lowercase letter"),
        z.regex(/[0-9]/, "Password must contain at least one number"),
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
