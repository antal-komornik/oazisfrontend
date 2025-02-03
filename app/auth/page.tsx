'use client'
import React, { useState } from 'react'
import LoginForm from '@/components/ui/profile/LoginForm'
import RegisterForm from "@/components/ui/profile/RegisterForm";

const Page = () => {
    const [authType, setAuthType] = useState<"login" | "register">("login")

    return (
        <>
            <div className="block md:hidden">
                <div className="join flex items-center justify-center gap-2 ">
                    <div className={`btn ${authType === "login" ? 'bg-emerald-500 text-black' : ''} `} onClick={() => setAuthType("login")}>Bejelntkezés</div>
                    <div className={`btn  ${authType === "register" ? 'bg-emerald-500 text-black' : ''} `} onClick={() => setAuthType("register")}>Regisztrálás</div>
                </div>
                <div className="divider"></div>
            </div>
            <div className='min-h-screen'>

                {authType === "login" ?
                    <div >
                        <LoginForm />
                        {/* <p className="text-sm">vagy</p>
            <p className="" onClick={() => setAuthType("register")}>Regisztálj be</p> */}
                    </div>
                    :
                    <div>
                        <RegisterForm />
                        {/* <p className="text-sm">vagy</p>
            <p className="" onClick={() => setAuthType("login")}>Jelentkezz be</p> */}
                    </div>
                }
            </div>

        </>)
}

export default Page