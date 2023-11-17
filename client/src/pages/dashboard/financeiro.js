import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modalidade from "@/components/cadastroModalidade"
import style from "@/styles/listausuarios.module.css";

export default function Financeiro(){
    const [openModal, setOpenModal] = useState(false)
    const [dados, setDados] = useState([])
    const router = useRouter()

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
                <div className={style.telaFixa}>
                    <div className={style.parteGerente}>
                        <div className={style.divUsuario}>
                            <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                            </svg>
                            <h1>USERNAME</h1>
                        </div>
                        <div className={style.divgerente}>
                            <button onClick={() => router.push('/dashboard/clientes')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <p>CLIENTES</p>
                            </button>
                            <button onClick={() => router.push('/dashboard/funcionarios')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-cog"><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/></svg>
                                <p>FUNCIONÁRIOS</p>
                            </button>
                        </div>
                        <button className={style.divsair}>
                            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.875 46.375H11.0417C9.87029 46.375 8.7469 45.9097 7.91861 45.0814C7.09033 44.2531 6.625 43.1297 6.625 41.9583V11.0417C6.625 9.87029 7.09033 8.7469 7.91861 7.91861C8.7469 7.09033 9.87029 6.625 11.0417 6.625H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M35.3333 37.5416L46.3749 26.5L35.3333 15.4583" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M46.375 26.5H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p>SAIR</p>
                        </button>
                    </div>
                </div>
                <div className={style.containerTable}>
                    <h1>Financeiro</h1>
                    <table>
                        <thead>
                            <tr className={style.tabelaCabecalho}>
                                <th className={style.cabecalho}>Nome do plano</th>
                                <th className={style.cabecalho}>Quantidade Associados</th>
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
                    <div>
                        <h1> FATURAMENTO À VISTA </h1>
                        <h2> R$ {dados.SomaValorVista} </h2>
                    </div>
                    <div>
                        <h1>FATURAMENTO PARCELADO  </h1>
                        <h2> R$ {dados.SomaValorParcelado?.toFixed(2)} </h2>
                    </div>

                    <div>
                        <h1>FATURAMENTO LÍQUIDO </h1>
                        <h2>R$ { dados.TotalLiquido}</h2>
                    </div>
                    <div>
                        <h1>TOTAL CLIENTES</h1>
                        <h2> {dados.QuantidadeTotalClientes}</h2>
                    </div>
                    <table>
                        <thead>
                        <tr className={style.tabelaCabecalho}>
                            <th className={style.cabecalho}>Clientes</th>
                            <th className={style.cabecalho}>Quantidade</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr className={style.linha}>
                                <th className={style.cabecalho}>Homens</th>
                                <td className={style.dadosNumber}>{dados.QuantidadeHomens}</td>
                            </tr>
                            <tr className={style.linha}>
                                <th className={style.cabecalho}>Mulheres</th>
                                <td className={style.dadosNumber}>{dados.QuantidadeMulheres}</td>
                            </tr>
                            <tr className={style.linha}>
                                <th className={style.cabecalho}>Total</th>
                                <td className={style.dadosNumber}>{dados.QuantidadeTotalClientes}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h1>Informações</h1>
                    <div className={style.tabela}>
                        <table>
                            <thead>
                                <tr className={style.tabelaCabecalho}>
                                    <th className={style.cabecalho}>Modalidade</th>
                                    <th className={style.cabecalho}>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dados.modalidade?.map(items => (
                                <tr key={items.nome} className={style.linha}>
                                    <td className={style.dados}>{items.nome}</td>
                                    <td className={style.dados}>{items.descricao}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.tabela}>
                        <table>
                            <thead>
                                <tr className={style.tabelaCabecalho}>
                                    <th className={style.cabecalho}>Plano</th>
                                    <th className={style.cabecalho}>Modalidades Disponíveis</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dados.planosModalidade?.map(items => (
                                <tr key={items.plano} className={style.linha}>
                                    <td className={style.dados}>{items.plano}</td>
                                    <td className={style.dados}>{items.modalidades}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={()=> setOpenModal(true)}>Criar Modalidade</button>
                    <Modalidade isOpen={openModal} setCloseModal={() => setOpenModal(!openModal)}/>
                </div>
            </div>
        </main>
    )
}