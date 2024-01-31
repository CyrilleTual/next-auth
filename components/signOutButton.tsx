"use client";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button
      onClick={async () => {await signOut()}}
      className="bg-slate-200 rounded-md  px-3"
    >
      SignOut
    </button>
  );
}

export default SignOutButton;
