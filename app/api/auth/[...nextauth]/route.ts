import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import {sql} from "@vercel/postgres";

const handler = NextAuth({
    session:{ strategy:"jwt"},
    pages:{ signIn:"/"},
    providers: [ CredentialsProvider({
        credentials: {
            email: { },
            password: { },
            usertype: { },
        },
        async authorize(credentials, req) {
        const response = await sql`select * from users where email=${credentials?.email} and usertype=${credentials?.usertype}`;
        const user = response.rows[0];
        const passwordCorrect =  await compare(credentials?.password || "", user.password);
        // console.log(passwordCorrect);
        if(passwordCorrect){
            return {
                id: user.id,
                email: user.email,
                usertype: user.usertype,
            }
        }
            return null
        }
    }) ],
})

export {handler as GET, handler as POST}