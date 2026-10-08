"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginState = {
  error?: string;
  success?: boolean;
};

export async function loginAction(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  try {
    // Auth.js credentials sign in
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin/dashboard", // Middleware will override this with proper role redirect!
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password. Please try again." };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }
    // Next.js redirect throws a special internal error; we must rethrow it!
    throw error;
  }
}