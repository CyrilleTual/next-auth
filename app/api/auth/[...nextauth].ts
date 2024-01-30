import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from '@/src/connect';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authConfig= {
    providers: [],
    adapter: PrismaAdapter(prisma)
}satisfies NextAuthOptions;

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
