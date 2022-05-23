import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      first?: string | null;
      last?: string | null;
      email?: string | null;
      age?: string | null;
      org?: string | null;
      image?: string | null;
    };
  }
}
