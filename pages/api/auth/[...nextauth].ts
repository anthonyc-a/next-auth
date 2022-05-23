import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import clientPromise from "./lib/mongodb";
import { verifyPassword } from "../../../lib/auth/auth";

type User = {
  name?: string | null;
  first?: string | null;
  last?: string | null;
  email?: string | null;
  image?: string | null;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const client = await MongoClient.connect(process.env.MONGODB_URI!);
          const db = client.db();

          const user = await db.collection("users").findOne({
            email: credentials?.email,
          });

          if (!user) {
            client.close();
            throw new Error("No user found");
          }

          const isPasswordValid = await verifyPassword(
            credentials!.password,
            user.password
          );

          if (!isPasswordValid) throw new Error("Password is not valid");

          client.close();

          return {
            first: user.first,
            last: user.last,
            email: user.email,
            age: user.age,
            org: user.org,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as User;
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
});
