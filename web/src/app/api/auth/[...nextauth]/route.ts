// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import GithubProvider from "next-auth/providers/github";
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23limFIkv4fhCV962o",
      clientSecret: "4612c54a793097a6c627e22852933df11c4ecc6a",
    }),
  ],
};
export const handler= NextAuth(authOptions);
export {handler as GET ,handler as POST}