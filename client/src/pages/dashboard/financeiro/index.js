import axios from "axios";
import { useEffect, useState } from "react";
import style from "@/styles/listausuarios.module.css";

export default function Financeiro(){
    const [dados, setDados] = useState([])

    useEffect(()=>{
        trazerDados()
    }, [])

    const trazerDados = async ()=>{
        const { data } = await axios.get('http://localhost:3333/financeiro')
        setDados(data)
        console.log(dados.TotalLiquido)
    }
    
    return(
        <main className="text-black">
            <div className={style.container}>
                <div className={style.parteGerente}>
                    <div className={style.divUsuario}>
                        <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                        <h1>USERNAME</h1>
                    </div>
                    <div className={style.divgerente}>
                        <button>CLIENTES</button>
                        <button>FUNCIONÁRIOS</button>
                    </div>
                    <div className={style.divsair}>
                        <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.875 46.375H11.0417C9.87029 46.375 8.7469 45.9097 7.91861 45.0814C7.09033 44.2531 6.625 43.1297 6.625 41.9583V11.0417C6.625 9.87029 7.09033 8.7469 7.91861 7.91861C8.7469 7.09033 9.87029 6.625 11.0417 6.625H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M35.3333 37.5416L46.3749 26.5L35.3333 15.4583" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M46.375 26.5H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p>SAIR</p>
                    </div>
                </div>
                <div className={style.containerTable}>
                    <div className={style.caixaTable}>
                        <div>
                            <h1 className={style.titulodash}>Dashboard</h1>
                            <div className={style.dashboard}>
                                <div className={style.avista}>
                                    <h1> FATURAMENTO À VISTA </h1>
                                    <h2> R$ {dados.SomaValorVista} </h2>
                                </div>
                                <div className={style.parcelado}>
                                    <h1>FATURAMENTO PARCELADO  </h1>
                                    <h2> R$ {dados.SomaValorParcelado?.toFixed(2)} </h2>
                                </div>
                                <div className={style.liquido}>
                                    <h1>FATURAMENTO LÍQUIDO </h1>
                                    <h2>R$ { dados.TotalLiquido}</h2>
                                </div>
                                <div className={style.totalClientes}>
                                    <h1>TOTAL CLIENTES</h1>
                                    <h2> {dados.QuantidadeTotalClientes}</h2>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <table className={style.tabelafinanceiro}>
                                <thead>
                                <tr className={style.tabelaCabecalho}>
                                    <th className={style.cabecalho}>Nome do plano</th>
                                    <th className={style.cabecalhoNumber}>Quantidade Associados</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dados.total_planos?.map(items => (
                                    <tr key={items.NomePlano} className={style.linha}>
                                        <td className={style.dados}>{items.NomePlano}</td>
                                        <td className={style.dadosNumber}>{items.QuantidadeAssociacoes}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}