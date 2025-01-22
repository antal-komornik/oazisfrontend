

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://127.0.0.1:8000/api/data/auth/login/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const user = await res.json();
                    if (res.ok && user) {
                        return {
                            id: user.id,
                            email: credentials.email,
                            name: `${user.user.first_name} ${user.user.last_name}`,
                            accessToken: user.access,
                            refreshToken: user.refresh,
                            profile: user.user.profile,
                            username: user.user.username,
                            firstName: user.user.first_name,
                            lastName: user.user.last_name,
                            token: user.key
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Error in authorization:", error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: "619052606655-458on3bcqumoa9al3hsu45cjteohr324.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    // callbacks: {
    //     async jwt({ token, user, account, profile }) {
    //         // Credentials provider kezelése
    //         if (user) {
    //             token.accessToken = user.accessToken;
    //             token.refreshToken = user.refreshToken;
    //             token.profile = user.profile;
    //             token.username = user.username;
    //             token.firstName = user.firstName;
    //             token.lastName = user.lastName;
    //             token.token = user.token;
    //             token.name = `${user.firstName} ${user.lastName}`;
    //         }

    //         // Google bejelentkezés kezelése
    //         if (account && account.provider === "google") {
    //             try {
    //                 const res = await fetch("http://127.0.0.1:8000/api/data/auth/auth/google/", {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         "Accept": "application/json"
    //                     },
    //                     body: JSON.stringify({
    //                         access_token: account.access_token,
    //                         id_token: account.id_token
    //                     }),
    //                 });

    //                 // Ne próbáljuk újra felhasználni a response body-t
    //                 const responseData = await res.json().catch(() => null);

    //                 if (res.ok && responseData) {
    //                     token.accessToken = responseData.key || responseData.access;
    //                     if (responseData.user) {
    //                         token.username = responseData.user.username;
    //                         token.firstName = responseData.user.first_name;
    //                         token.lastName = responseData.user.last_name;
    //                         token.name = `${responseData.user.first_name} ${responseData.user.last_name}`;
    //                     }
    //                 } else {
    //                     console.error("Failed to authenticate with Django API:", res.status);
    //                 }
    //             } catch (error) {
    //                 console.error("Error in Google auth flow:", error);
    //             }
    //         }
    //         return token;
    //     },

    //     async session({ session, token }) {
    //         if (token) {
    //             session.accessToken = token.accessToken;
    //             session.user.name = token.name;
    //             session.user.firstName = token.firstName;
    //             session.user.lastName = token.lastName;
    //             session.user.username = token.username;
    //         }
    //         return session;
    //     }
    // }

    callbacks: {
        async jwt({ token, user, account, profile }) {
            // Credentials provider kezelése
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                // Mentjük a profile adatokat a tokenbe
                token.profile = user.profile;
                token.username = user.username;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.token = user.token;
                token.name = `${user.firstName} ${user.lastName}`;
            }
            // ... többi kód marad változatlan
            return token;
        },
    
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken;
                session.user.name = token.name;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.username = token.username;
                // Hozzáadjuk a profile objektumot a session user objektumához
                session.user.profile = {
                    address: token.profile?.address || '',
                    phone_number: token.profile?.phone_number || ''
                };
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST };