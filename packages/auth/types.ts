import type { Session as DefaultSession } from 'next-auth';

export interface User {
  name: string;
  email: string;
  image: string;
  initials: string;
}

export interface Session extends DefaultSession {
  user: User;
}
