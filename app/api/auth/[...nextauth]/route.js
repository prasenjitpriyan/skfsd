import { connectDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/User';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({
            email: credentials?.email?.toLowerCase(),
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (user.status !== 'active') {
            throw new Error('Account is suspended. Contact admin.');
          }
          if (!user.passwordHash) {
            throw new Error('Password not set. Please use password reset.');
          }
          const isValidPassword = await bcrypt.compare(
            credentials?.password,
            user.passwordHash
          );
          if (!isValidPassword) {
            throw new Error('Invalid password');
          }
          await User.findByIdAndUpdate(user._id, {
            lastLogin: new Date(),
          });
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            roles: user.roles,
            officeIds: user.officeIds,
            image: user.image,
            mustChangePassword: user.mustChangePassword,
            twoFactorEnabled: user.twoFactorEnabled,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await connectDB();
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create placeholder user
          existingUser = await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            roles: ['OfficeUser'],
            status: 'pendingOffice', // 👈 Mark incomplete
            officeIds: [], // 👈 Empty
          });

          user.id = existingUser._id.toString();
          return '/choose-office'; // 👈 Redirect user to pick office
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
        token.officeIds = user.officeIds;
        token.mustChangePassword = user.mustChangePassword;
        token.twoFactorEnabled = user.twoFactorEnabled;
      }

      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.officeIds = token.officeIds;
        session.user.mustChangePassword = token.mustChangePassword;
        session.user.twoFactorEnabled = token.twoFactorEnabled;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
