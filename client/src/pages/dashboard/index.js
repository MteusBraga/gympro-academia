import { AuthContext } from "../"
import { useContext } from "react"


export default function dashboard(){
    const { user } = useContext(AuthContext)
    return (
        <h1>
            BEM-VINDO(A)!
        </h1>
    )
}