// imports
import NextAuth from "next-auth"
// importing providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            idToken: true,
        })
    ],
    callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.id_token = account.id_token;
        }
        return token;
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        return Object.assign(session, {id_token: token.id_token});
      },
    }
})

export { handler as GET, handler as POST }