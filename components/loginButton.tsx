"use client"

import { signIn } from "next-auth/react";

function LogginButton() {
  return (
    <button onClick={async()=>{await signIn("github")}} className="bg-slate-200 rounded-md  px-3">
      Log with gitHub
    </button>
  );
}

export default LogginButton