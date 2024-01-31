import { Session } from "next-auth";

export type UserProps ={
    sessionUser: NonNullable<Session['user']>
}

export const User = (props: UserProps) =>{
    return<>{props.sessionUser?.name}  id  {props.sessionUser.id}</>
}