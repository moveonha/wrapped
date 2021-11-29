import Head from "next/head";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);

  // Check if user exists
  async function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
    console.log(user);
  }

  // Sign in with GitHub
  async function signIn() {
    await supabase.auth.signIn({ provider: "github" });
  }

  // Sign out
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-200">
      <Head>
        <title>GitHub Wrapped</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="flex text-6xl font-bold">
          GitHub <p className="pl-2 text-purple-700">Wrapped</p>
        </h1>
        <div className="pt-5">
          {user ? (
            <div>
              <p className="text-black pb-5">
                Hey,{" "}
                {user.user_metadata.full_name
                  ? user.user_metadata.full_name
                  : user.email}
                , you're logged in!
              </p>
              <button
                onClick={signOut}
                className="bg-purple-600 text-gray-100 py-2 px-6 rounded"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={signIn}
                className="bg-purple-600 text-gray-100 py-2 px-6 rounded"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
