"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();
  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <Link
        href="/"
        className="p-4 flex justify-between items-center shadow-md"
      >
        Home
      </Link>
      {status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="bg-slate-500 text-yellow-100 px-6 py-8 rounded-lg"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-slate-500 text-yellow-100 px-6 py-8 rounded-lg"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Navbar;
