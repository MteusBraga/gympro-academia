import { createContext, useState } from "react";
import { setCookie } from "nookies";
import Router from "next/router";

import axios from 'axios'
export const AuthContext = createContext({})

export function AuthProvider({ children }){
    const isAuthenticated = false;
    const [user, setUser] = useState(null)

    async function signIn({ email, senha }){

        const result = await axios.post('http://localhost:3333/getLogin', {
            email: email,
            senha: senha
        })

        setCookie(undefined, 'gympro-token', result[0].idCliente, {
            maxAge: 60 * 60 * 1 //1 hora
        })

        setUser(result[0])

        Router.push('/dashboard')
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )

}