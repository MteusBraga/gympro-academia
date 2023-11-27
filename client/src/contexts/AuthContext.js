import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Router from "next/router";

import axios from 'axios'
export const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [user, setUser] = useState(null)

    const isAuthenticated = !!user;

    useEffect(()=>{
        const { 'gympro-token': token } = parseCookies()
        if(token){
            axios.post('http://localhost:3333/recuperarUsuario', {token: token}).then(result=>{
                console.log(result.data)
                setUser(result.data)
            })
        }
    },[])
    
    async function signIn({ email, senha }){

        const { data } = await axios.post('http://localhost:3333/getLogin', {
            email: email,
            senha: senha
        })

        console.log(data)
        if(!data){
            window.alert('email invalido')
        }else{
            setCookie(undefined, 'gympro-token', data.idpessoa, {
                maxAge: 60 * 60 * 1 //1 hora
            })
    
            setUser(data)
            Router.push('/dashboard')
        }
    }

    function signOut() {
        destroyCookie(null, 'gympro-token');
        setUser(null);
        Router.push('/login'); // Redireciona para a página inicial ou outra página desejada após o logout.
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )

}