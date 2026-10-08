import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // Where to redirect if user is not authenticated
  },
  callbacks: {
    // 1. JWT Callback: Runs whenever a JSON Web Token is created or updated
    async jwt({ token, user }) {
      if (user) {
        // 'user' is only passed on initial login from auth.ts
        token.id = user.id;
        token.role = (user as any).role;
        token.status = (user as any).status;
        token.societyId = (user as any).societyId;
        token.flatId = (user as any).flatId;
      }
      return token;
    },

    // 2. Session Callback: Dictates what is available in React components / server actions
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
        (session.user as any).status = token.status;
        (session.user as any).societyId = token.societyId;
        (session.user as any).flatId = token.flatId;
      }
      return session;
    },
  },
  providers: [], // Configured with credentials in auth.ts
} satisfies NextAuthConfig;


/*
Understand What Just Happened:
1.When a user logs in, Auth.js calls jwt(). We copy the user's role, status, societyId onto the encrypted token.
2. When your page or component calls auth(), Auth.js calls session(). We copy those fields from token into session.user.

Now TypeScript might complain that session.user.role does not exist on default NextAuth types. That's normal! We will fix that with type declaration next.
*/