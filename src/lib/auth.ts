import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import dbClient from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: MongoDBAdapter(dbClient),
  providers: [GitHub],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin

      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
});
