import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react"
import { GetServerSideProps } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { Router, useRouter } from "next/router"


export default function Dashboard(retorno){
    const router = useRouter()
    const handleLogOut = () =>{
        destroyCookie()
        signOut()
    }
    const { user, signOut} = useContext(AuthContext)
    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="font-bold text-2xl mb-[30px] mt-[30px]">
                BEM-VINDO(A)! {user?.nome}
            </h1>
                <div className="flex flex-wrap w-3/5 justify-around">
                    <button className="text-white bg-red-500 text-lg font-bold p-[20px] rounded-md" onClick={()=>{
                        router.push('/dashboard/financeiro')
                    }}>Financeiro</button>
                    <button className="text-white bg-red-500 text-lg font-bold  p-[20px] rounded-md" onClick={()=>{
                        router.push('/dashboard/funcionarios')
                    }}>Funcinarios</button>
                    <button className="text-white bg-red-500 text-lg font-bold  p-[20px] rounded-md" onClick={()=>{
                        router.push('/dashboard/clientes')
                    }}>Clientes</button>
                </div>
        </div>
    )
}

export async function getServerSideProps(ctx){
    const { ['gympro-token']: token } = parseCookies(ctx)
    if(!token){
        return{
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }
    return {
        props:{
            
        }
    }
}