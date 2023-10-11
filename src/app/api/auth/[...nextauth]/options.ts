import type { Awaitable, NextAuthOptions, RequestInternal, Session, User } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials"
import { GithubProfile } from 'next-auth/providers/github'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

const client = new PrismaClient()

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(client),
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                //console.log(profile)
                return {
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                    email: profile.email,
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            authorize: function (credentials: Record<'username' | 'password', string> | undefined, req: Pick<RequestInternal, 'query' | 'headers' | 'body' | 'method'>): Awaitable<User | null> {
                throw new Error('Function not implemented.')
            }
        })
    ],
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role 
        async session({ session, token }) {
            return session}
            ,

        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            return token
        } 
    }
}