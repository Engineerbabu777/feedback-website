




import GoogleProvider from 'next-auth/providers/google'
import clientPromise from './mongoDB';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { Session, Account, SessionStrategy,User ,DefaultSession} from 'next-auth';
import { JWT } from "next-auth/jwt";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "263154491287-fgiorgl6086aia9r067dv3fv1drqr7dv.apps.googleusercontent.com",
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