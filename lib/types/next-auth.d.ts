import "next-auth";
import {  DefaultUser } from "next-auth";
// import { JWT } from "next-auth/jwt";

interface UserProfile {
    address: string;
    phone_number: string;
}

export interface CustomUser extends DefaultUser {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    profile: UserProfile;
    accessToken?: string;
    refreshToken?: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: CustomUser;
    access_expiration: string;
    refresh_expiration: string;
}


declare module "next-auth" {
    interface Session {
        user: CustomUser;
        accessToken?: string;
        refreshToken?: string;
    }
    
    type User = CustomUser
    // interface User extends CustomUser {}
}

// declare module "next-auth" {
//     interface Session extends DefaultSession {
//         accessToken?: string;
//         refreshToken?: string;
//         user?: CustomUser;
//         expires?: string;
//     }
    
//     type User = AuthResponse
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         accessToken?: string;
//         refreshToken?: string;
//         user?: CustomUser;
//         expires?: string;
//     }
// }



// declare module "next-auth" {
//     interface Session extends DefaultSession {
//         user: CustomUser;
//         accessToken?: string;
//         refreshToken?: string;
//     }

//     type User = CustomUser
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         accessToken?: string;
//         refreshToken?: string;
//         user?: CustomUser;
//     }
// }