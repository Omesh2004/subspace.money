import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/', // Using the home page as the sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      // Basic session setup, we can attach the user ID or other data here if needed
      return session;
    },
  },
});

export { handler as GET, handler as POST };
