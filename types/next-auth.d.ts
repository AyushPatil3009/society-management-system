import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
        token.societyId = user.societyId;
        token.flatId = user.flatId;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role!;
        session.user.status = token.status!;
        session.user.societyId = token.societyId;
        session.user.flatId = token.flatId;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;