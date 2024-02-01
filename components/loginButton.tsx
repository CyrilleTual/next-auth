"use client"

import { signIn } from "next-auth/react";

function LogginButton() {
  return (
    <button onClick={async()=>{await signIn()}} className="bg-slate-200 rounded-md  px-3">
      Log with 
    </button>
  );
}

export default LogginButton