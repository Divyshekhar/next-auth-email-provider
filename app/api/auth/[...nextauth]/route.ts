// import NextAuth from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

// //[...nextauth] this is catch all router that is everything that is coming to /api/auth/"whatever" request will be handled here
// export async function GET(req: NextRequest) {

//     const { pathname } = req.nextUrl

//     //split() returns the things in an array
//     const segments = pathname.split('/');
//     console.log("this is segment", segments)
//     //slice(3) removing the already known part of the url from the array segments
//     const nextauthparams = segments.slice(3);
//     console.log("this is params", nextauthparams);
//     return NextResponse.json({
//         message: "This is the response from server"
//     })
// }

import { PrismaClient } from '@/app/generated/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
;
import NextAuth from 'next-auth';
import EmailProvider  from "next-auth/providers/email";

const prisma = new PrismaClient()
const handler = NextAuth({
  providers: [
    EmailProvider({
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD
            }
          },
          from: process.env.EMAIL_FROM
        })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signIn"
  }
})

export const GET = handler
export const POST = handler
