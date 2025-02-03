// types.ts
interface UserProfile {
    address: string;
    phone_number: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile: UserProfile;
    is_premium: boolean;
}

interface AuthResponse {
    access: string;
    refresh: string;
    user: User;
    access_expiration: string;
    refresh_expiration: string;
}

// Extended next-auth types
import { DefaultSession, DefaultUser } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        refreshToken?: string;
        access_expiration?: string;
        refresh_expiration?: string;
        user: {
            id: number;
            email: string;
            username: string;
            firstName: string;
            lastName: string;
            profile: UserProfile;
            is_premium: boolean;
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: number;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        profile: UserProfile;
        is_premium: boolean;
        accessToken: string;
        refreshToken: string;
        access_expiration: string;
        refresh_expiration: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        access_expiration?: string;
        refresh_expiration?: string;
        profile?: UserProfile;
        username?: string;
        firstName?: string;
        lastName?: string;
        is_premium?: boolean;
        exp?: number;
    }
}

// route.ts
import { baseURL } from "@/lib/services/services";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                
                try {
                    const response = await axios.post<AuthResponse>(`${baseURL}/auth/login/`, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const { data: user } = response;
                    
                    if (response.status === 200 || response.status === 201) {
                        return {
                            id: user.user.id,
                            email: user.user.email,
                            name: `${user.user.first_name} ${user.user.last_name}`,
                            username: user.user.username,
                            firstName: user.user.first_name,
                            lastName: user.user.last_name,
                            profile: user.user.profile,
                            is_premium: user.user.is_premium,
                            accessToken: user.access,
                            refreshToken: user.refresh,
                            access_expiration: user.access_expiration,
                            refresh_expiration: user.refresh_expiration,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Error in authorization:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.access_expiration = user.access_expiration;
                token.refresh_expiration = user.refresh_expiration;
                token.profile = user.profile;
                token.username = user.username;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.is_premium = user.is_premium;
                token.name = `${user.firstName} ${user.lastName}`;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                // Handle optional token properties safely
                session.accessToken = token.accessToken ;
                session.refreshToken = token.refreshToken;
                session.access_expiration = token.access_expiration;
                session.refresh_expiration = token.refresh_expiration;
                
                // Only assign if the token properties exist
                if (token.profile) session.user.profile = token.profile;
                if (token.username) session.user.username = token.username;
                if (token.firstName) session.user.firstName = token.firstName;
                if (token.lastName) session.user.lastName = token.lastName;
                if (token.is_premium !== undefined) session.user.is_premium = token.is_premium;
                
                // Set name only if both firstName and lastName exist
                if (token.firstName && token.lastName) {
                    session.user.name = `${token.firstName} ${token.lastName}`;
                }
            }
            return session;
        }
        // async session({ session, token }) {
        //     if (token && session.user) {
        //         session.accessToken = token.accessToken;
        //         session.refreshToken = token.refreshToken;
        //         session.access_expiration = token.access_expiration;
        //         session.refresh_expiration = token.refresh_expiration;
        //         session.user.profile = token.profile;
        //         session.user.username = token.username;
        //         session.user.firstName = token.firstName;
        //         session.user.lastName = token.lastName;
        //         session.user.is_premium = token.is_premium;
        //         session.user.name = `${token.firstName} ${token.lastName}`;
        //     }
        //     return  session;
        // },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth',
        // signUp: '/auth/signup',
    },
    
});

export { handler as GET, handler as POST };
