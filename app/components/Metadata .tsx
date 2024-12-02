import type { Metadata } from 'next'

// Metadata típus definiálása
export const metadata: Metadata = {
    // Alapvető meta adatok
    title: {
        default: 'Oázis Étterem',
        template: '%s | Oázis Étterem' // Ez a sablon használható az oldalakon, ahol a %s helyére kerül az adott oldal címe
    },
    description: 'Az Oázis Étterem napi menü kínálata és étlapja. Házias ízek, kedvező árak, kellemes környezet.',

    // Alkalmazás neve amikor a felhasználó hozzáadja a kezdőképernyőhöz
    applicationName: 'Oázis Étterem',

    // Alapértelmezett nyelv
    metadataBase: new URL('https://oazis.example.com'),

    // Kulcsszavak
    keywords: ['étterem', 'magyar konyha', 'napi menü', 'házhozszállítás', 'Oázis'],

    // Szerzői információk
    authors: [{ name: 'Komornik Antal', url: 'https://komornikantal.hu' }],

    // Ikonok
    icons: {
        icon: '/favicon.ico',
        // shortcut: '/favicon-16x16.png',
        // apple: '/favicon.png',
        // other: [
        //     {
        //         rel: 'apple-touch-icon-precomposed',
        //         url: '/favicon.png',
        //     },
        // ],
    },

    // OpenGraph metadata közösségi médiához
    openGraph: {
        type: 'website',
        locale: 'hu_HU',
        url: 'https://oazis.example.com',
        title: 'Oázis Étterem',
        description: 'Az Oázis Étterem napi menü kínálata és étlapja',
        siteName: 'Oázis Étterem',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Oázis Étterem',
            },
        ],
    },

    // Twitter specifikus metadata
    twitter: {
        card: 'summary_large_image',
        title: 'Oázis Étterem',
        description: 'Az Oázis Étterem napi menü kínálata és étlapja',
        images: ['/twitter-image.jpg'],
    },

    // Robotok beállítása
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Viewport beállítások
    // viewport: {
    //     width: 'device-width',
    //     initialScale: 1,
    //     maximumScale: 1,
    // },

    // Manifest fájl
    manifest: '/manifest.json',

    // Egyéb meta tagek
    other: {
        'theme-color': '#ffffff',
        'format-detection': 'telephone=no',
    },
}
