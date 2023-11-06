import { useForm, register } from "react-hook-form"
import { AuthContext } from "@/contexts/AuthContext";
import { setCookie } from "nookies";
import { useContext, useState } from "react";
import Router from "next/router";
import axios from 'axios'


export default function Login({ children }) {
    const [user, setUser] = useState(null)

    const isAuthenticated = !!user;
    async function signIn({ email, senha }) {
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

    const { register, handleSubmit } = useForm();
    // const { signIn } = useContext(AuthContext)

    async function handleSignIn(data) {
        await signIn(data)
    }

    return (
        <>
            <form className="flex flex-col" onSubmit={handleSubmit(handleSignIn)} >
                <label>email</label>
                <input className="text-black" type='email' required {...register('email')}></input>
                <label>senha</label>
                <input className="text-black" type='password' required {...register('senha')}></input>
                <button type="submit">LOGAR MENÓ</button>
            </form>
            <AuthContext.Provider value={{ isAuthenticated, user }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

