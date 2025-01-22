import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Az email cím megadása kötelező')
        .email('Érvénytelen email cím formátum'),
    password: z.string().min(1, 'A jelszó megadása kötelező')
});


export const registerSchema = z.object({
    email: z.string()
        .min(1, 'Az email cím megadása kötelező')
        .email('Érvénytelen email cím formátum'),
    username: z.string()
        .min(1, 'Az felhasználónév megadása kötelező')
        .min(5, 'A felhasználónévnek legalább 5 karakter hosszúnak kell lennie'),
    password1: z.string()
        .min(1, 'A jelszó megadása kötelező')
        .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie'),
    password2: z.string()
        .min(1, 'A jelszó megerősítése kötelező')
})


export const profileSchema = z.object({
    email: z.string()
        .min(1, 'Email megadása kötelező')
        .email('Érvénytelen email cím'),
    profile: z.object({
        phone_number: z.string()
            .regex(/^(\+?36|06)(20|30|70)\d{7}$/, 'Érvénytelen telefonszám formátum (pl: +36201234567)'),
    })
});