import axios from "axios";
import { useRouter } from "next/router";
import ExcluirConta from "@/components/excluirConta"
import EditPlano from "@/components/editPlanoFuncionario"
import style from "@/styles/listausuarios.module.css";
import tabela from "@/styles/tabela.module.css";
import { ProxyCacheFuncionario } from "@/classes/funcionario";
import { useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies } from "nookies"
import { AuthContext } from "@/contexts/AuthContext";


export default function Funcionario() {
    const { signOut } = useContext(AuthContext)
    const [objSelecionada, setObjSelecionada] = useState([])
    const [pessoaSelecionada, setPessoaSelecionada] = useState({})
    const [openModal, setOpenModal] = useState(false) /*Modal de excluir*/ 
    const [openEdit, setOpenEdit] = useState(false) /*Modal de editar*/
    const router = useRouter()
    const [funcionario, setFuncionario] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(()=>{
        // trazerDados()
        setDados()
    }, [])

    const setDados = async () => {
        const proxyFuncionario = new ProxyCacheFuncionario();
        const c = await proxyFuncionario.trazerDados();
    
        setFuncionario(c);
    };

    return (
        <main className="text-black">
            <div className={style.container}>
                <div className={style.telaFixa}>
                    <div className={style.parteGerente}>
                        <div className={style.divUsuario}>
                            <svg className={style.icon} onClick={() => router.push('/dashboard/profile')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                            </svg>
                            <h1>{user?.nome}</h1>
                        </div>
                        <div className={style.divgerente}>
                            <button onClick={() => router.push('/dashboard/clientes')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <p>CLIENTES</p>
                            </button>
                            <button onClick={() => router.push('/dashboard/financeiro')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>    
                                <p>FINANCEIRO</p>
                            </button>
                        </div>
                        <button className={style.divsair} onClick={signOut}>
                            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.875 46.375H11.0417C9.87029 46.375 8.7469 45.9097 7.91861 45.0814C7.09033 44.2531 6.625 43.1297 6.625 41.9583V11.0417C6.625 9.87029 7.09033 8.7469 7.91861 7.91861C8.7469 7.09033 9.87029 6.625 11.0417 6.625H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M35.3333 37.5416L46.3749 26.5L35.3333 15.4583" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M46.375 26.5H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p>SAIR</p>
                        </button>
                    </div>
                </div>
                <div className={style.parteLista}>
                    <div className={style.containerLista}>
                        <div className={style.cimaTabela}>
                            <h1>FUNCIONÁRIOS</h1>
                            <button className={style.adicionar} onClick={() => router.push('/dashboard/cadastroFuncionarios')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                <p>Add Funcionários</p>
                            </button>
                        </div>
                        <div className={tabela.container}>
                            <div className={tabela.barraFixa}>
                                <p>Nome</p>
                                <p>Cargo</p>
                                <p>Salário</p>
                                <p>Sexo</p>
                                <p>Nascimento</p>
                                <p>CPF</p>
                                <p>Email</p>
                                <p>Telefone</p>
                                <p>Data de Admissão</p>
                                <p>Data de pagamento</p>
                                <p>Ações</p>
                            </div>
                                {funcionario.map((items) => {
                                // Função para formatar a data
                                const formatarData = (data) => {
                                const dataObj = new Date(data);
                                const dia = dataObj.getDate().toString().padStart(2, '0');
                                const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
                                const ano = dataObj.getFullYear();
                                return `${dia}/${mes}/${ano}`;
                                };
                                return (
                                    <div className={tabela.barra}>
                                        <p className={tabela.dados}>
                                            {items.nome}
                                        </p>
                                        <p className={tabela.dados}>
                                            {items.cargo}
                                        </p>
                                        <p className={tabela.dados}>
                                            {items.salario}
                                        </p>
                                        <p className={tabela.dados}>
                                            {items.sexo}
                                        </p>
                                        <p className={tabela.dados}>
                                            {formatarData(items.nascimento)}
                                        </p>
                                        <p className={tabela.dados}>
                                            {items.cpf}
                                        </p>
                                        <p className={tabela.dadosG}>
                                            {items.email}
                                        </p>
                                        <p className={tabela.dados}>
                                            {items.telefone}
                                        </p>
                                        <p className={tabela.dados}>
                                            {formatarData(items.dataAdmissao)}
                                        </p>
                                        <p className={tabela.dados}>
                                            {formatarData(items.dataPagamento).slice(0, 5)}
                                        </p>
                                        <div className={tabela.dadosEdit}>
                                        <a onClick={() => {
                                        setObjSelecionada(items)
                                        setOpenEdit(true)
                                        }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></a>
                                        <a onClick={()=> {
                                            setPessoaSelecionada(items.idPessoa)
                                            setOpenModal(true)
                                            }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></a>
                                        </div>
                                    </div>
                                )
                                })}
                                <ExcluirConta isOpen={openModal} setCloseModal={() => setOpenModal(!openModal)} idPessoa={pessoaSelecionada}/>
                                <EditPlano isOpen={openEdit} setCloseEdit={() => setOpenEdit(!openEdit)} informacoes={objSelecionada} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
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