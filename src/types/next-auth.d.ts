import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      avatar: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    avatar: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    avatar: string;
  }
}
