import { useForm, register } from "react-hook-form"
import { AuthContext } from "@/contexts/AuthContext";
import { setCookie } from "nookies";
import { useContext, useState } from "react";
import Router from "next/router";
import axios from 'axios'


export default function Login({ children }) {

    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext) 

    async function handleSignIn(data) {
        await signIn(data)
    }

    return (
        <>
            <form className="flex  flex-col" onSubmit={handleSubmit(handleSignIn)} >
                <label>email</label>
                <input className="text-black" type='email' required {...register('email')}></input>
                <label>senha</label>
                <input className="text-black" type='password' required {...register('senha')}></input>
                <button type="submit">LOGAR MENÓ</button>
            </form>
            {/* <AuthContext.Provider value={{ isAuthenticated, user }}>
                {children}
            </AuthContext.Provider> */}
        </>
    )
}

