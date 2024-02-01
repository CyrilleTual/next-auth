// src/auth-config.ts
import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/src/connect";

if (
  !process.env.GITHUB_ID ||
  !process.env.GITHUB_SECRET ||
  !process.env.GOOGLE_ID ||
  !process.env.GOOGLE_SECRET
) {
  throw new Error("Missing provider id or secret ");
}

const checkUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      id: "Credentilas",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      type: "credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials && credentials.username && credentials.password) {
          const user = await checkUser(credentials.username);
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            // console.log("user recupéré : ", user);
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
        return null;
      },
    }),
  ],

  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  // pour modifier la session //////////  ( ajout de l'id dans notre cas)

  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
  },

  session: {
    maxAge: 30 * 24 * 60 * 60, 
  },

  callbacks: {
    ////////////  identification par crédentials -> utilisation automatique du token
    ///////////// token contents name email picture by default
    jwt: async ({ token, user }) => {
      if (user) {
        token.user_id = user.id;
      }
      //console.log("token", token, "session", session); // here session is undefined
      return token;
    },

    /////////// Oauth identification -> ok a session is created
    session: async ({ session, token, user }) => {
      if (token) {
        console.log("ororo", token);
      }
      if (session.user) {
        session.user.id = user.id;
      }
       console.log("ici", session, token); // not displayed with credential authentification 
      return session;
    },
  },
} satisfies NextAuthOptions;

///////  necessite une modificaiton de type pour ajouter l'id dans la session
// -> fichier nextAuth.d.ts
