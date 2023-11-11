import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react"
import { GetServerSideProps } from "next"
import { destroyCookie, parseCookies } from "nookies"


export default function Dashboard(retorno){
    const handleLogOut = () =>{
        destroyCookie()
        signOut()
    }
    const { user, signOut} = useContext(AuthContext)
    return (
        <h1>
            BEM-VINDO(A)! {user?.nome}

            <button onClick={handleLogOut}>SAIR</button>
        </h1>
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