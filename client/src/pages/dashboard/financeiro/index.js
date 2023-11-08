import axios from "axios";
import { useEffect, useState } from "react";


export default function Financeiro(){
    const [dados, setDados] = useState([])

    useEffect(()=>{
        trazerDados()
    }, [])

    const trazerDados = async ()=>{
        const { data } = await axios.get('http://localhost:3333/financeiro')
        setDados(data)
    }
    
    return(
        <main className="text-black">
            <h1>FATURAMENTO VISTA: R${dados.SomaValorVista} </h1>
            <h1>FATURAMENTO PARCELADO: R${dados.SomaValorParcelado} </h1>
            <h1>FATURAMENTO LIQUIDO: R${ dados.TotalLiquido} </h1>
            <h1>TOTAL CLIENTES: {dados.QuantidadeTotalClientes} </h1>
            <table>
                <thead>
                <tr>
                    <th>Nome do plano</th>
                    <th>Quantidade Associados</th>
                </tr>
                </thead>
                <tbody>
                {dados.total_planos.map(items => (
                    <tr key={items.NomePlano}>
                        <td>{items.NomePlano}</td>
                        <td>{items.QuantidadeAssociacoes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    )
}