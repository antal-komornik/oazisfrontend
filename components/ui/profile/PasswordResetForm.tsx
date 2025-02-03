// 'use client'
// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
// // import { useRouter } from 'next/navigation';

// interface PasswordResetFormProps {
//     token: string;
// }

// const PasswordResetForm = ({ }: PasswordResetFormProps) => {
//     const [formData, setFormData] = useState({
//         password: '',
//         confirm_password: '',
//     });
//     const [isLoading, setIsLoading] = useState(false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (formData.password !== formData.confirm_password) {
//             toast.error('A megadott jelszavak nem egyeznek!');
//             return;
//         }

//         setIsLoading(true);

//         try {
//             // await passwordResetService.resetPassword({
//             //     password: formData.password,
//             //     confirm_password: formData.confirm_password,
//             //     token: token,
//             // });
//             // console.log(token)

//             toast.success('A jelszó sikeresen megváltoztatva!');
//             // router.push('/');
//         } catch (error) {
//             toast.error('Hiba történt a jelszó megváltoztatása során.');
//             console.error(error)
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-base-200">
//             <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold text-center mb-6">Új jelszó megadása</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="label">
//                             <span className="label-text">Új jelszó</span>
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="input input-bordered w-full"
//                             placeholder="Új jelszó"
//                             required
//                             minLength={8}
//                         />
//                     </div>

//                     <div>
//                         <label className="label">
//                             <span className="label-text">Új jelszó megerősítése</span>
//                         </label>
//                         <input
//                             type="password"
//                             name="confirm_password"
//                             value={formData.confirm_password}
//                             onChange={handleChange}
//                             className="input input-bordered w-full"
//                             placeholder="Új jelszó megerősítése"
//                             required
//                             minLength={8}
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'Feldolgozás...' : 'Jelszó megváltoztatása'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default PasswordResetForm;






'use client'
import React, { useState } from 'react';
import { passwordResetService } from '@/lib/services/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface PasswordResetFormProps {
    token: string;
}

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        password: '',
        confirm_password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            toast.error('A megadott jelszavak nem egyeznek!');
            return;
        }

        setIsLoading(true);

        try {
            await passwordResetService.resetPassword({
                password: formData.password,
                confirm_password: formData.confirm_password,
                token: token,
            });

            toast.success('A jelszó sikeresen megváltoztatva!');
            router.push('/');
        } catch (error) {
            toast.error('Hiba történt a jelszó megváltoztatása során.');
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Új jelszó megadása</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Új jelszó</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Új jelszó"
                            required
                            minLength={8}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Új jelszó megerősítése</span>
                        </label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Új jelszó megerősítése"
                            required
                            minLength={8}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Feldolgozás...' : 'Jelszó megváltoztatása'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;