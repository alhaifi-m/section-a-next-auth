import { connectToMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, name } = await request.json();
  await connectToMongoDB();
  await User.create({ email, name });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
