"use server";

import { signInSchema, signUpSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT") === true
  );
}

function safeCallbackUrl(url: string | null): string {
  if (url && url.startsWith("/") && !url.startsWith("//")) return url;
  return "/";
}

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const callbackUrl = safeCallbackUrl(formData.get("callbackUrl") as string);
    await signIn("credentials", { ...user, redirectTo: callbackUrl });
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message ?? "Invalid input",
      };
    }
    return { success: false, message: "Invalid email or password" };
  }
}

export async function signOutAction(): Promise<void> {
  await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const { name, email, password } = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const hashedPassword = await hash(password, 12);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    await signIn("credentials", { email, password });
    return { success: true, message: "Account created successfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "An account with this email already exists",
      };
    }
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message ?? "Invalid input",
      };
    }
    return { success: false, message: "Failed to sign up. Please try again." };
  }
}
