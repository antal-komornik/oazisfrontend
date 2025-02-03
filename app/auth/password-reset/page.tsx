'use client'
// app/auth/password-reset/page.tsx
import React, { useState } from 'react';
import { passwordResetService } from '@/lib/services/auth';
import { toast } from 'react-hot-toast';

const PasswordResetPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await passwordResetService.requestReset(email);
            setEmailSent(true);
            toast.success('Az emailt elküldtük a megadott címre!');
        } catch (error) {
            toast.error('Hiba történt a jelszó visszaállítási kérelem során.');
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Ellenőrizd az email fiókod!</h2>
                    <p className="text-center text-base-content/70">
                        Ha létezik fiók a megadott email címmel, hamarosan kapsz egy emailt a jelszó visszaállítási útmutatóval.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Jelszó visszaállítása</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Email cím</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="pelda@email.com"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Feldolgozás...' : 'Jelszó visszaállítása'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetPage;