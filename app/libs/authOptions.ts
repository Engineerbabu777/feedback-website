




import GoogleProvider from 'next-auth/providers/google'
import clientPromise from './mongoDB';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { Session, Account, SessionStrategy,User ,DefaultSession} from 'next-auth';
import { JWT } from "next-auth/jwt";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "835707392342-eslla7g3rhahpsrsc6i0lbjvctnnmor0.apps.googleusercontent.com",
      clientSecret: "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",
    }),

  ],

  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: "/"
  }
  ,

  callbacks: {
    session: async ({ token, session }: { token: JWT, session: Session }) => {

      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }

      return session;
    }
  },
  secret: 'NEXTAUTH_SECRECT_v3',

  adapter: MongoDBAdapter(clientPromise),

}