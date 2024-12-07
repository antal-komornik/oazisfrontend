import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './components/Providers'
import { metadata } from '@/app/components/Metadata '
import Header from './components/ui/header/Header'
import SideNav from './components/ui/header/navs/SideNav'
import AppWrapper from './components/ui/AppWrapper'


const inter = Inter({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppWrapper>

          <div className="min-h-screen bg-base-100 text-base-content">
            <Header />
            <div className="flex min-h-screen">
              <div className="hidden lg:block">
                <SideNav />
              </div>
              <div className="w-full z-0">
                <div className="lg:block z-0">
                  {children}
                </div>
              </div>
            </div>
          </div>
          </AppWrapper>
          {/* <div className="min-h-screen bg-base-100 text-base-content">
            <Header />
            <div className="flex min-h-screen"> */}
          {/* Desktop nézet */}
          {/* <div className="hidden lg:flex">
                <SideNav />
                <FoodLister />
              </div> */}

          {/* Mobil nézet */}
          {/* <div className="lg:hidden w-full">
                <MobileNav />
              </div> */}
          {/* </div>
          </div> */}
        </Providers>
      </body >
    </html >
  )
}