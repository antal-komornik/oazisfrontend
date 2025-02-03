// 'use client'
// import React, { useState } from 'react';
// import { passwordResetService } from '@/lib/services/auth';
// import { toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// interface Props {
//     params: {
//         token: string;
//     };
//     searchParams: { [key: string]: string | string[] | undefined };
// }

// const PasswordResetConfirmPage = ({
//     params,
//     // searchParams,
// }: Props) => {
//     const router = useRouter();
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
//             await passwordResetService.resetPassword({
//                 password: formData.password,
//                 confirm_password: formData.confirm_password,
//                 // uid: searchParams.uid,
//                 token: params.token,
//             });

//             toast.success('A jelszó sikeresen megváltoztatva!');
//             router.push('/');
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

// export default PasswordResetConfirmPage;


// // import { Metadata } from 'next';
// // import PasswordResetForm from '@/components/ui/profile/PasswordResetForm';

// // export const metadata: Metadata = {
// //     title: 'Jelszó visszaállítása',
// //     description: 'Állítsa vissza jelszavát biztonságosan.',
// // };

// // // Használjuk a Next.js által biztosított típusokat
// // type Props = {
// //     token: string;

// //     // searchParams: Record<string, string | string[] | undefined>;
// // };

// // // A komponens korrekt típusdefinícióval

// // // async function PasswordResetPage({ params }: { oarams: Promise<{ token: string }> }) {
// // //     return <PasswordResetForm token={params} />;
// // // }

// // async function PasswordResetPage({
// //     token,
// // }: Props) {
// //     console.log('page')
// //     console.log(token)
// //     return <PasswordResetForm token={token} />;

// //     // const slug = (await params).slug
// //     // return <div>My Post: {slug}</div>
// // }

// // export default PasswordResetPage;





import { Metadata } from 'next';
import PasswordResetForm from '@/components/ui/profile/PasswordResetForm';

export const metadata: Metadata = {
    title: 'Jelszó visszaállítása',
    description: 'Állítsa vissza jelszavát biztonságosan.',
};

interface PageProps {
    params: Promise<{ token: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}


export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    return <PasswordResetForm token={resolvedParams.token} />;
}