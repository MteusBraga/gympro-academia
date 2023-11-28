import { useForm, register } from "react-hook-form"
import { AuthContext } from "@/contexts/AuthContext";
import { setCookie } from "nookies";
import { useRouter } from "next/router"
import style from "@/styles/listausuarios.module.css";
import { useContext, useState, useEffect} from "react";
import Router from "next/router";
import axios from 'axios'

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Login() {
    const router = useRouter()
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext) 

    useEffect(() => {AOS.init();}, [])

    async function handleSignIn(data) {
        console.log(data)
        await signIn(data)
    }

    return (
        <main className="flexdps items-center justify-center">
            <div className= "mt-7 m-5 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg">
                <button data-aos="zoom-in" data-aos-delay="200" className={style.voltar} onClick={() => router.push('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                            <path d="M12 19l-7-7 7-7M5 12h14"></path></svg>
                        <p className="ml-2">Voltar</p>
                </button>
                <h2 data-aos="zoom-in" data-aos-delay="200" className="mt-2 mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">LOGIN</h2>
                <form data-aos="zoom-in" data-aos-delay="200" className="flex  flex-col" onSubmit={handleSubmit(handleSignIn)} >
                    <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Email</label>
                    <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type='email' required {...register('email')}></input>
                    <label className="block text-sm font-medium leading-6 text-gray-900 mb-1 mt-2">Senha</label>
                    <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type='password' required {...register('senha')}></input>
                    <button className="flex w-full justify-center rounded-full bg-red-600 px-1 py-2 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-span-2 w-24 m-auto" type="submit">login</button>
                </form>
                {/* <AuthContext.Provider value={{ isAuthenticated, user }}>
                    {children}
                </AuthContext.Provider> */}
            </div>
        </main>
    )
}

