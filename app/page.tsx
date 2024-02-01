import LogginButton from "@/components/loginButton";
import SignOutButton from "@/components/signOutButton";
import { User } from "@/components/user";
import { getAuthSession } from "@/lib/auth";


export default async function Home() {
  // pour recuperer la session coté serveur :
  const session = await getAuthSession()
  //console.log("session: ", JSON.stringify(session, null, 2));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {session && session.user && session.user.name && (
        <>
          <p> Bienvenue</p>
          <p>
            <User sessionUser={session.user} />
          </p>
        </>
      )}
      <h1>NextAuth test project</h1>

      <div className="flex flex-row w-[400px]   bg-slate-500 items-center justify-evenly py-5 rounded-2xl">
        {!session && <LogginButton />}
        {/* {!session && <LogginButton provider="google" />} */}
        {session?.user?.name && <SignOutButton />}
      </div>
    </main>
  );
}
