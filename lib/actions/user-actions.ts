"use server";

import { signInSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";
function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT") === true
  );
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
    const callbackUrl = (formData.get("callbackUrl") as string) || "/";
    await signIn("credentials", { ...user, redirectTo: callbackUrl });
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: "Invalid email or password" };
  }
}

export async function signOutUser() {
  try {
    await signOut();
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: "Failed to sign out" };
  }
}
