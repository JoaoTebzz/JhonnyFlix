"use client";
import Input from "@/components/input";
import { useState, useCallback } from "react";
import axios from "axios";
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation";
import {FaGithub} from 'react-icons/fa';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  
  const login = useCallback(async() => {
      try{
        await signIn('credentials', {
          email,
          password,
          redirect: false,
          fallbackUrl: '/profiles'
        })
      }catch (error){
        console.log(error);
      }
  }, [email, password]);

  const register = useCallback(async() => {
      try {
          await axios.post(`/api/register`, {
            email,
            name,
            password
          });
          login();
      } catch(error){
        console.error(error);
      }
  }, [email, name, password, login]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Login" : "Sign-up"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Name"
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  id="Name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id="Email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id="Password"
                type="password"
                value={password}
              />
            </div>
            <button onClick={variant === 'login' ? login : register } className="bg-red-600 py-3 text-white rounded-md w-full empty:10 mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Sing-up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div className="h-10 w-10 bg-white rounded-full place-items-center flex item-center justify-center cursor-pointer
                hover:opacity-80 transition
                "
                onClick={() => signIn("github", {callbackUrl: "/profiles"})}
                >
                  <FaGithub size={30}/>
                </div>
            </div>
            <p className="text-neutral-500  text-center mt-12">
              {variant === "login" ? "First time using netflix" : "Already have an account" }
              <span
                className="hover:underline text-white ml-1  cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
