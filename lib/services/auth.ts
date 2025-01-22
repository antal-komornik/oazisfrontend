// -----------------------------------------------
import axios from "axios";
import { RegisterFormData } from "../types/types";
// import { baseURL } from "./services";
import { signIn } from "next-auth/react";
import { LoginFormData, LoginResponse, AuthError } from '@/lib/types/types';
import { useRouter } from "next/router";
const API_URL = 'http://127.0.0.1:8000/api/data'




// Axios instance létrehozása alapbeállításokkal
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/data',
    withCredentials: true,  // Ez fontos a cookie-k küldéséhez
    headers: {
        'Content-Type': 'application/json',
    }
});

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

export const loginUser = async (credentials: LoginFormData): Promise<LoginResponse> => {
    try {
        // const response = fetch('http://127.0.0.1:8000/api/data/auth/login/', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(credentials),
        //   })
        const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/login/`,credentials,
            {
                withCredentials: true,  // Ez fontos a cookie-k küldéséhez
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        return    response.data
        
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



export const getUserData = async ( accessToken:string | undefined) => {
    
    await axios.get(`${API_URL}/auth/user/`, {
         withCredentials: true ,
         headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        // handle success
        return response
        console.log(response);
      })
    .catch(function (error) {
        // handle error
        
        console.log(error);
      })
    
}

export const updateUserProfile = async (data: {
    first_name?: string;
    last_name?: string;
    address?: string;
    phone_number?: string;
}, access: string) => {
    // const { access } = getAuthTokens();
    // const csrfToken = getCsrfToken();
    const response = await axios.put(`${API_URL}/auth/user/`, data,{
        // method: 'PATCH',
        withCredentials: true ,
        headers: {
           'Authorization': `Bearer ${access}`,
        //    'X-CSRFToken': csrfToken || '',
           'Content-Type': 'application/json',
       }
        // body: JSON.stringify(data),
    });
    
    // if (!response.status ) {
    //     throw new Error('Failed to update user details');
    // }
    console.log(response)
    return response
};

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

export const resetUserPwd = async (data: { email: string }) => {
    const response = await fetch(`${API_URL}/auth/password/reset/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email })
    });
    
    if (!response.ok) {
        throw new Error('Hiba a jelszó visszaállításkor');
    }
    return response.json();
};



export const SendRegistrationForm = async (data:RegisterFormData) => {
    const csrfToken = getCsrfToken();
    const response = await axios.post(`${API_URL}auth/registration/`, data, {
         withCredentials: true ,
         headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        }
    })
    if (response.status === 200 || response.status === 201) {
        await signIn('credentials', {
            email: data.email,
            password: data.password1,
            redirect: false,
        });
        // router.push('/');
    }
    
    return response
}


