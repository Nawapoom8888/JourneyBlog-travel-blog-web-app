import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnection from "@/utils/dbConnection";

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnection();

        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Please login via the method you used to sign up");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // create and save user account data in database if they login with social media accounts.
    async signIn({ user }) {
      dbConnection();
      const { email } = user;

      let dbUser = await User.findOne({ email });

      if (!dbUser) {
        dbUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }
      return true;
    },
    // add additional user data to the session (JWT, session)
    jwt: async ({ token, user }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      token.user = userByEmail;
      return token;
    },
    session: async ({ session, token }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      session.user = userByEmail;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
