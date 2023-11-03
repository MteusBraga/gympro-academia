import { useForm, register } from "react-hook-form"
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react"; 


export default function Login(){
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext)

    async function handleSignIn (data) {
        await signIn(data)
    }

    return(
        <form className="flex flex-col" onSubmit={handleSubmit(handleSignIn)} >
            <label>email</label>
            <input className="text-black" type='email' required {...register('email')}></input>
            <label>senha</label>
            <input className="text-black" type='password' required {...register('senha')}></input>
            <button type="submit">LOGAR MENÓ</button>
        </form>
    )
}