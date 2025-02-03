import axios from "axios";
import { LoginResponse, RegisterFormData, UserDataProps } from "../types/types";
// import { baseURL } from "./services";
import { signIn } from "next-auth/react";
import { LoginFormData } from '@/lib/types/types';
// import { AuthResponse } from "../types/types";
import { baseURL } from "./services";
// import { CustomUser } from "../types/next-auth";


const API_URL = baseURL;




// Axios instance létrehozása alapbeállításokkal
// const axiosInstance = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api/data',
//     withCredentials: true,  // Ez fontos a cookie-k küldéséhez
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// Interceptor a CSRF token kezeléséhez
// axiosInstance.interceptors.request.use((config) => {
//     const csrftoken = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('csrftoken='))
//         ?.split('=')[1];

//     if (csrftoken) {
//         config.headers['X-CSRFToken'] = csrftoken;
//     }
//     return config;
// });

// export const loginUser = async (credentials: LoginFormData): Promise<AuthResponse> => {
//     try {
//         const response = await axios.post<AuthResponse>(
//             `${API_URL}/auth/login/`,credentials,
//             {
//                 withCredentials: true,  // Ez fontos a cookie-k küldéséhez
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             }
//         )
//         const responseData: LoginResponse = {
//             access: response.data.access,
//             refresh: response.data.refresh, // Ez most már megérkezik
//             user: response.data.user
//         };

//         return responseData;
        
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             throw new Error(error.response?.data?.detail || 'Bejelentkezési hiba');
//         }
//         throw error;
//     }
// };


export const loginUser = async (credentials: LoginFormData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/login/`,
            credentials,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || 'Bejelentkezési hiba');
        }
        throw error;
    }
};
// export const loginUser = async (credentials: LoginFormData): Promise<LoginResponse> => {
//     const csrfToken = getCsrfToken();
//     try {
//         const response = await axios.post(`${API_URL}auth/login/`, credentials, {
//             withCredentials: true ,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': csrfToken,

//             },

//         });

//         console.log('CSRF TOKEN---------------------------------------------------')
//         console.log(getCsrfToken)
//         if (response.status !== 200 ) {
//             throw response as AuthError;
//         }

//         return response.data as LoginResponse;
//         } catch (error) {
//         if ((error as AuthError).detail) {
//             throw error;
//         }
//         throw new Error('Hálózati hiba történt');
//     }
// };

export const setAuthTokens = (access: string, refresh: string) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
};

export const getAuthTokens = () => ({
    access: localStorage.getItem('accessToken'),
    refresh: localStorage.getItem('refreshToken')
});

export const getUserData = async (accessToken: string | undefined) => {
    const response = await axios.get(`${API_URL}/auth/user/`, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response;
};

// export const getUserData = async ( accessToken:string | undefined) => {
    
//     await axios.get(`${API_URL}/auth/user/`, {
//          withCredentials: true ,
//          headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(function (response) {
//         // handle success
//         return response
//         console.log(response);
//       })
//     .catch(function (error) {
//         // handle error
        
//         console.log(error);
//       })
    
// }

// export const updateUserProfile = async (data: {
//     first_name?: string;
//     last_name?: string;
//     address?: string;
//     phone_number?: string;
// }, access: string) => {
   
//     const response = await axios.put(`${API_URL}/auth/user/`, data,{
//         withCredentials: true ,
//         headers: {
//            'Authorization': `Bearer ${access}`,
//            'Content-Type': 'application/json',
//        }
//     });
    
    
//     console.log(response)
//     return response
// };

// export const resetUserPwd = async (email) => {
//     const { access } = getAuthTokens();
//     const response = await fetch(`${API_URL}/auth/password/reset/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: email })
//     });
//     if (!response.ok) {
//         throw new Error('Hiba a jelszó visszaállításkor');
//     }
//     console.log(response)
//     return response.json();
// }

export const updateUserProfile = async (data: UserDataProps, accessToken: string) => {
    try {
        const response = await axios.put(`${API_URL}/auth/user/`, {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            profile: {
                address: data.profile.address,
                phone_number: data.profile.phone_number
            }
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            // Token frissítés logika
            throw new Error('Token lejárt');
        }
        throw error;
    }
};

// export const resetUserPwd = async (data: { email: string }) => {
//     const response = await fetch(`${API_URL}/auth/password/reset/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: data.email })
//     });
    
//     if (!response.ok) {
//         throw new Error('Hiba a jelszó visszaállításkor');
//     }
//     return response.json();
// };
// lib/services/auth.ts


// export const passwordResetService = {
//     requestReset: async (email: string) => {
//         try {
//             const response = await axios.post(`${API_URL}/auth/forgot-password/`, {
//                 email
//             });
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },

//     resetPassword: async (data: {
//         password: string;
//         confirm_password: string;
//         token: string;
//     }) => {
//         try {
//             const {  ...passwordData } = data;
//             const response = await axios.post(
//                 `${API_URL}/auth/reset-password/${token}/`, 
//                 passwordData
//             );
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     }
// };

export const passwordResetService = {
    // Email küldése jelszó visszaállításhoz
    requestReset: async (email: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password/`, {
                email
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Új jelszó beállítása
    resetPassword: async (data: {
        password: string;
        confirm_password: string;
        // uid: string;
        token: string;
    }) => {
        try {
            const { token, ...passwordData } = data;  // Kiemeljük a tokent
            const response = await axios.post(
              `${API_URL}/auth/reset-password/${token}/`, 
              passwordData  // Csak a jelszavakat küldjük
            );
            return response.data;
          } catch (error) {
            throw error;
          }
    }
};


export const SendRegistrationForm = async (data:RegisterFormData) => {
    const response = await axios.post(`${API_URL}auth/registration/`, data, {
         withCredentials: true ,
         headers: {
            'Content-Type': 'application/json',
        }
    })
    if (response.status === 200 || response.status === 201) {
        await signIn('credentials', {
            email: data.email,
            password: data.password1,
            redirect: false,
            callback: "/"
        });
        // router.push('/');
    }
    
    return response
}


