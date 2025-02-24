'use client'
import Input from "@/components/input";
import  { useState, useCallback } from "react";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Login' : 'Register'}
                        </h2>
                    <div className="flex flex-col gap-4">
                      <Input label="Name" onChange={(e: any) => {setName(e.target.value)}} id="Name"  value={name}/>
                      <Input label="Email" onChange={(e: any) => {setEmail(e.target.value)}} id="Email" type="email" value={email}/>
                      <Input label="Password" onChange={(e: any) => {setPassword(e.target.value)}} id="Password" type="password" value={password}/>
                    </div>
                        <button className="bg-red-600 py-3 text-white rounded-md w-full empty:10 mt-10 hover:bg-red-700 transition">
                            Login
                        </button>
                        <p className="text-neutral-500  text-center mt-12">
                            First time using netflix?
                            <span className="hover:underline text-white ml-1  cursor-pointer" onClick={toggleVariant}>
                                Create an account
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;