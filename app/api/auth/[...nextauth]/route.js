// imports
import NextAuth from "next-auth"
// importing providers
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // async jwt({ token, account, profile }) {
        //     return token
        // }
    }
})

export { handler as GET, handler as POST }