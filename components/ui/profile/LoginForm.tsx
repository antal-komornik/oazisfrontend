'use client'
import { signIn } from "next-auth/react";
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { AlertStatus, LoginFormData, LoginFormErrors, LoginFormProps } from "@/lib/types/types";
import { loginSchema } from "@/lib/utils/validations";
import { loginUser } from "@/lib/services/auth";
// import { baseURL } from "@/lib/services/services";
// import type { AxiosError } from 'axios';

const GoogleLogin = () => {
    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded flex items-center justify-center gap-2"
        >
            Bejelentkezés Google fiókkal
        </button>
    );
};



const LoginForm = ({ setShowLoginModal }: LoginFormProps) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState<AlertStatus | null>(null);
    const [hasErrors, setHasErrors] = useState(true);

    useEffect(() => {
        const hasAnyError = Object.values(errors).some(error => error !== undefined);
        const hasEmptyFields = Object.values(formData).some(value => !value);
        setHasErrors(hasAnyError || hasEmptyFields);
    }, [errors, formData]);


    useEffect(() => {
        const validateForm = () => {
            try {
                // Validate all fields that are not empty
                const fieldsToValidate = Object.entries(formData)
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .filter(([_, value]) => value !== '')
                    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

                if (Object.keys(fieldsToValidate).length > 0) {
                    loginSchema.partial().parse(fieldsToValidate);
                }

                const hasAnyError = Object.values(errors).some(error => error !== undefined);
                const hasEmptyFields = Object.values(formData).some(value => !value);
                setHasErrors(hasAnyError || hasEmptyFields);
            } catch (error) {
                console.log(error)
                setHasErrors(true);
            }
        };

        validateForm();
    }, [formData, errors]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        try {
            // Csak akkor validálunk, ha van érték
            if (value) {
                // Pick helyett shape használata a validációhoz
                const fieldSchema = z.object({
                    [name]: loginSchema.shape[name as keyof typeof loginSchema.shape]
                });

                fieldSchema.parse({ [name]: value });
                setErrors(prev => ({ ...prev, [name]: undefined }));
            } else {
                setErrors(prev => ({ ...prev, [name]: undefined }));
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors(prev => ({
                    ...prev,
                    [name]: err.errors[0].message
                }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true);
        // setAlert(null);

        try {

            await loginUser(formData);
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });
            if (result?.error) {
                setAlert({
                    type: 'error',
                    message: 'Helytelen email cím vagy jelszó.'
                });
            }
            else {
                setShowLoginModal(false)
                // router.push('/');
                // router.refresh();
            }
        } catch (err) {
            const error = err as Error;
            setAlert({
                type: 'error',
                message: 'Váratlan hiba történt. Kérjük, próbálja újra.'
            });
            console.error("Bejelentkezési hiba:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full overflow-auto">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-0">
                    <h2 className="card-title justify-center text-2xl mb-4">Bejelentkezés</h2>
                    {alert && (
                        <Alert variant={alert.type === 'error' ? "destructive" : "default"}>
                            <AlertDescription>
                                {alert.message}
                            </AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Jelszó</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input input-bordered"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Elfelejtett jelszó?</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || hasErrors}
                            className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 
                            ${(isLoading || hasErrors) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
                        </button>
                    </form>

                    <div className="divider">vagy</div>

                    <div><GoogleLogin /></div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;