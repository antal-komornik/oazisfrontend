'use client'
import React, { useState, useEffect } from 'react'
import { z } from 'zod';
import { getUserData, updateUserProfile } from '@/lib/services/auth';
import { useSession } from 'next-auth/react';
import { sFormErrorsProps, UserDataProps } from '@/lib/types/types';
import { profileSchema } from '@/lib/utils/validations';
import { useRouter } from 'next/navigation';

// interface EmailData {
//     email: string;
// }

const UserData = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<UserDataProps>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        profile: {
            address: '',
            phone_number: ''
        }
    });
    const [editData, setEditData] = useState<UserDataProps>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        profile: {
            address: '',
            phone_number: ''
        }
    });
    const [formErrors, setFormErrors] = useState<sFormErrorsProps>({});
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!session?.accessToken) {
            router.push('/');
            return;
        }
        loadUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.accessToken, router]);

    const loadUserData = async () => {
        try {
            const response = await getUserData(session?.accessToken);
            if (response?.status === 200) {
                const data = response.data;
                setUserData(data);
                setEditData(data);
            }
        } catch (error) {
            setError('Hiba az adatok betöltésekor');
            console.error(error)
            router.push('/');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.accessToken) {
            setError('Nincs érvényes munkamenet');
            return;
        }
        try {
            await updateUserProfile(editData, session?.accessToken);
            await loadUserData();
            setIsEditing(false);
        } catch (error) {
            if (error instanceof Error && error.message === 'Token lejárt') {                // Irányítsd át a felhasználót a bejelentkezéshez

                router.push('/login');
            }
            setError('Hiba a profil módosításakor');
        }

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('profile.')) {
            const field = name.split('.')[1];
            setEditData(prev => ({
                ...prev,
                profile: { ...prev.profile, [field]: value }
            }));

            try {
                profileSchema.shape.profile.parse({ phone_number: value });
                setFormErrors(prev => ({ ...prev, [name]: undefined }));
            } catch (err) {
                setFormErrors(prev => ({
                    ...prev,
                    [name]: err instanceof z.ZodError ? err.errors[0].message : undefined
                }));
            }
        } else if (name === 'email') {
            setEditData(prev => ({ ...prev, email: value }));

            try {
                profileSchema.shape.email.parse(value);
                setFormErrors(prev => ({ ...prev, email: undefined }));
            } catch (err) {
                setFormErrors(prev => ({
                    ...prev,
                    email: err instanceof z.ZodError ? err.errors[0].message : undefined
                }));
            }
        } else {
            setEditData(prev => ({ ...prev, [name]: value }));
        }
    };



    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log('HANDLESUBMIT')

    //     if (!session?.accessToken) {
    //         setError('Nincs érvényes munkamenet');
    //         return;
    //     }

    //     try {
    //         // const response = await updateUserProfile(editData, session.accessToken);
    //         setUserData(editData);
    //         setIsEditing(false);
    //         // if (response.status === 200 || response.status === 201) {

    //         const up = await update({
    //             ...session,
    //             user: {
    //                 ...session.user,
    //                 firstName: editData.first_name,
    //                 lastName: editData.last_name,
    //                 email: editData.email,
    //                 profile: {
    //                     address: editData.profile.address,
    //                     phone_number: editData.profile.phone_number
    //                 }
    //             }
    //         });
    //         console.log('UPDATE Session')
    //         console.log(up)

    //         // return loadUserData()
    //         // }
    //     } catch (error) {
    //         setError('Hiba a profil módosításakor: ' + error);
    //     }
    // };


    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* <h1 className="text-3xl font-bold mb-8">Profil</h1> */}

            {/* User adatok megjelenítése */}
            {!isEditing && (
                <div className=" p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Felhasználói adatok</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Vezetéknév:</p>
                            <p className="font-medium">{userData.last_name || 'Nincs megadva'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Keresztnév:</p>
                            <p className="font-medium">{userData.first_name || 'Nincs megadva'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Email:</p>
                            <p className="font-medium">{userData.email || 'Nincs megadva'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Telefonszám:</p>
                            <p className="font-medium">{userData.profile.phone_number || 'Nincs megadva'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Cím:</p>
                            <p className="font-medium">{userData.profile.address || 'Nincs megadva'}</p>
                        </div>


                    </div>
                    <div className='flex flex-col pt-4 gap-2'>
                        <button
                            onClick={() => setIsEditing(true)}
                            className='btn btn-outline w-8/12 '
                        // className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Szerkesztés
                        </button>

                    </div>
                </div>
            )}

            {/* Szerkesztő form */}
            {isEditing && (
                <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Adatok szerkesztése</h2>
                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 mb-2">Vezetéknév</label>
                            <input
                                type="text"
                                value={editData.first_name}
                                onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
                                className="w-full p-2 border rounded text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Keresztnév</label>
                            <input
                                type="text"
                                value={editData.last_name}
                                onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                                className="w-full p-2 border rounded  text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editData.email}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded text-black ${formErrors.email ? 'border-red-500' : ''}`}
                            />
                            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                        </div>
                        <div>
                            <label>Telefonszám</label>
                            <input
                                type="tel"
                                name="profile.phone_number"
                                value={editData.profile.phone_number}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded text-black ${formErrors['profile.phone_number'] ? 'border-red-500' : ''}`}
                            />
                            {formErrors['profile.phone_number'] && <p className="text-red-500 text-sm mt-1">{formErrors['profile.phone_number']}</p>}
                        </div>
                        <div>
                            <label>Cím</label>
                            <input
                                type="text"
                                value={editData.profile.address}
                                onChange={(e) => setEditData({
                                    ...editData, profile: {
                                        ...editData.profile, address: e.target.value
                                    }
                                })}
                                className="w-full p-2 border rounded  text-black"

                            />
                        </div>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Mentés
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setEditData(userData);
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Mégse
                        </button>
                    </div>
                </form>
            )}

            {/* <div className="block md:hidden">
                <div className='flex flex-col pt-4 gap-2'>

                    <button onClick={() => signOut}
                        className='btn btn-outline w-8/12'>Kijelentkzés</button>
                </div>
            </div> */}

        </div>
    )
}

export default UserData