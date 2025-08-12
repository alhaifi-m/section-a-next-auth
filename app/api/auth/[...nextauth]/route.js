import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { signIn } from "next-auth/react";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;

        try {
          await connectToMongoDB();
          const userExists = await User.findOne({ email });
          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "Post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });
            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.error("Error signing in:", error);
        }
      }
      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
