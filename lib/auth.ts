import { getServerSession } from "next-auth";
import { authConfig } from "@/src/auth-config";

export const getAuthSession =  () => {
    return   getServerSession(authConfig)
};