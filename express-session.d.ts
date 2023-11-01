// typings/express-session.d.ts

import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: number,
    authenticated: boolean
  }
}
