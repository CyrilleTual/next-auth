// src/auth-config.ts
import { NextAuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/src/connect";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("Missing githuh id or secret ");
}

export  const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  // pour modifier la session
  callbacks: {
    session : async ({session, user}) => {
      if (session.user) {
           session.user.id = user.id;
      }
      return (session)
    }
  },
} satisfies NextAuthOptions;

///////  necessite une modificaiton de type pour ajouter l'id dans la session 
// -> fichier nextAuth.d.ts