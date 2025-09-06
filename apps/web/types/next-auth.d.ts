import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email: string;
    accountType: "CREDENTIALS" | "GOOGLE" | "GITHUB";
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email: string;
    accountType: "CREDENTIALS" | "GOOGLE" | "GITHUB";
  }
}
