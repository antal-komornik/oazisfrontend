'use client';
import { signIn } from "next-auth/react";
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { registerSchema } from "@/lib/utils/validations";
import { AlertStatus, RegisterFormData, RegisterFormErrors, RegisterFormProps } from "@/lib/types/types";
import axios from "axios";
import { SendRegistrationForm } from "@/lib/services/auth";





const RegisterForm = ({ setShowRegisterModal }: RegisterFormProps) => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [hasErrors, setHasErrors] = useState(true);
    const [alert, setAlert] = useState<AlertStatus | null>(null);

    useEffect(() => {
        const hasAnyError = Object.values(errors).some(error => error !== undefined);
        const hasEmptyFields = Object.values(formData).some(value => !value);
        setHasErrors(hasAnyError || hasEmptyFields);
    }, [errors, formData]);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newFormData = {
            ...formData,
            [name]: value
        };
        setFormData(newFormData);

        // Validáció a registerSchema alapján
        const validationSchema = z.object({
            [name]: registerSchema.shape[name as keyof typeof registerSchema.shape]
        });
        console.log(validationSchema)

        try {
            validationSchema.parse({ [name]: value });

            // Jelszó egyezés külön ellenőrzése
            if ((name === 'password1' || name === 'password2') &&
                newFormData.password1 && newFormData.password2 &&
                newFormData.password1 !== newFormData.password2) {
                throw new Error('A jelszavak nem egyeznek');
            }

            setErrors(prev => ({ ...prev, [name]: undefined }));
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                [name]: err instanceof z.ZodError ? err.errors[0].message : (err as Error).message
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setAlert(null);

        try {
            registerSchema.parse(formData);
            const res = await SendRegistrationForm(formData)
            if (res.status === 200 || res.status === 201) {
                setShowRegisterModal(false)
            }

        } catch (err) {

            if (axios.isAxiosError(err)) {
                if (!err.response) {
                    setAlert({
                        type: 'error',
                        message: 'A szerver nem elérhető. Kérjük, próbálja később.'
                    });
                } else if (err.response.status === 400 || err.response.status === 401) {
                    setAlert({
                        type: 'error',
                        message: 'Helytelen email cím vagy jelszó.'
                    });

                    const errorData = err.response.data;
                    if (errorData.username?.[0].includes('already exists')) {
                        setAlert({
                            type: 'error',
                            message: 'Ez a felhasználónév már foglalt.'
                        });
                    } else {
                        setAlert({
                            type: 'error',
                            message: 'Helytelen adatok.'
                        });
                    }
                } else {
                    setAlert({
                        type: 'error',
                        message: 'Váratlan hiba történt. Kérjük, próbálja újra.'
                    });
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        signIn("google");
    };

    return (
        <div className="flex  justify-center items-center w-full ">

            <div className="card  bg-base-100 shadow-xl">
                <div className="card-body p-0">
                    <h2 className="card-title justify-center text-2xl mb-4">Regisztráció</h2>
                    {alert && (
                        <Alert variant={alert.type === 'error' ? "destructive" : "default"}>
                            <AlertDescription>
                                {alert.message}
                            </AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label" htmlFor="username">
                                <span className="label-text">Felhasználónév</span>
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="felhasználónév"
                                className="input input-bordered"
                                value={formData.username}
                                // onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                onChange={handleChange}
                                required
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email@example.com"
                                className="input input-bordered"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="password1">
                                <span className="label-text">Jelszó</span>
                            </label>
                            <input
                                type="password"
                                id="password1"
                                name="password1"
                                // placeholder="••••••••"
                                className={`input input-bordered ${errors.password1 ? 'input-error' : ''}`}
                                value={formData.password1}
                                onChange={handleChange}
                                required
                            />
                            {errors.password1 && (
                                <p className="mt-1 text-sm text-red-500">{errors.password1}</p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="password2">
                                <span className="label-text">Jelszó megerősítése</span>
                            </label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                // placeholder="••••••••"
                                className={`input input-bordered ${errors.password2 ? 'input-error' : ''}`}
                                value={formData.password2}
                                onChange={handleChange}
                                required
                            />
                            {errors.password2 && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.password2}</span>
                                </label>
                            )}

                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || hasErrors}
                            className={`btn btn-outline w-full text-white py-2 px-4 rounded hover:bg-blue-600 
                        ${(isLoading || hasErrors) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Regisztráció...' : 'Regisztráció'}
                        </button>
                    </form>

                    <div className="divider">vagy</div>

                    <button
                        onClick={handleGoogleRegister}
                        className="btn btn-outline w-full"
                    >
                        Regisztráció Google-lel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm
