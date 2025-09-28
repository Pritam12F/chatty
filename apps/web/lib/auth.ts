import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@workspace/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email && !credentials?.password) {
          return null;
        }

        try {
          const userExists = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!userExists) {
            console.log("Doesnt exist");
            return null;
          }
          if (userExists.accountType !== "CREDENTIALS") {
            console.log("Not same type");
            throw new Error(
              `User already registered with ${userExists.accountType}`
            );
          }
          if (!bcrypt.compareSync(credentials.password, userExists.password!)) {
            console.log("Incorrect pass");
            return null;
          }

          return {
            id: userExists.id,
            name: userExists?.name,
            email: userExists.email,
            accountType: userExists.accountType,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GH_ID ?? "",
      clientSecret: process.env.GH_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          accountType: user.accountType,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id === token.id;
        session.user.name === token.name;
        session.user.email === token.email;
        session.user.accountType === token.accountType;
      }

      return session;
    },
    async signIn({ account, user }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const userExists = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });

        user.id === userExists?.id;

        if (!userExists) {
          const userCreated = await prisma.user.create({
            data: {
              email: user.email,
              accountType: account.provider.toUpperCase() as
                | "GOOGLE"
                | "GITHUB",
            },
          });

          user.id === userCreated.id;
        } else if (
          userExists &&
          userExists.accountType !== account.provider.toUpperCase()
        ) {
          return `/signin?error=${encodeURIComponent("User already registered with another method")}`;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;
