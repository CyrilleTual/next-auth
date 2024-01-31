// nextAuth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth"{
    interface Session extends DefaultSession{
        user: AdapterUser & {
            id?: string;
        }
    }
}