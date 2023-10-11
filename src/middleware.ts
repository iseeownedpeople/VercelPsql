// middleware is applied to all routes, use conditionals to select
// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { redirect } from 'next/navigation'
export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
        if (request.nextUrl.pathname.startsWith("/extra")
            && request.nextauth.token?.role !== "user") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher 
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
