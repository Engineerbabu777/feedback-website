

import {Session, User,DefaultSession} from 'next-auth';
import {JWT} from 'next-auth/jwt';

// nextauth.d.ts
declare module "next-auth/jwt" {
    interface JWT {
    }
  }

  
declare module "next-auth" {
    interface User {
    }

  
    interface Session extends DefaultSession {
      user?: User
      
    }
  }