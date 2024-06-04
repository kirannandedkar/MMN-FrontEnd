// imports
import { handleSigninGoogle } from "@/utils/auth";
import NextAuth from "next-auth"
// importing providers
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      idToken: true,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      handleSigninGoogle();
      return true;
    },
    async jwt({ token, user, account, profile, trigger }) {
      // Persist the OAuth access_token to the token right after signin
      if (trigger == 'signIn' || trigger == 'signUp') {
        const id_token = account?.id_token;
        const accessToken = account?.access_token;
        return Object.assign(token, { id_token, accessToken });
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      return Object.assign(session, { id_token: token.id_token, accessToken: token.accessToken });
    },
  }
})

export { handler as GET, handler as POST }