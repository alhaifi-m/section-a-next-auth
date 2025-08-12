"use client";
import React from "react";
import LoginBtn from "./LoginBtn";
import { useSession } from "next-auth/react";
import Image from "next/image";

const UserInfo = () => {
  const { status, data: session } = useSession();
  console.log("Session Data: ", session);
  console.log("Session Status:", status);

  return status === "authenticated" ? (
    <div className="flex flex-col items-center gap-4 shadow-md p-6">
      <Image
        src={session.user.image}
        alt="user Image"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div>
        <span className="text-xl font-bold">Name: {session.user.name}</span>
      </div>
      <div>
        <span className="font-bold">{session.user.email}</span>
      </div>
    </div>
  ) : (
    <LoginBtn />
  );
};

export default UserInfo;
