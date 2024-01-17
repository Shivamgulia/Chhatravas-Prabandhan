import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const url = process.env.NEXT_PUBLIC_API_URL;

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // authenticate if user
        // console.log(credentials.email + credentials.password);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await response.json();
        // console.log(data);

        if (!response.ok) {
          throw Error('Invalid');
        }
        return data;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
    signOut: '/auth',
  },
};

export default NextAuth(authOptions);
