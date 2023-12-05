import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { destroyCookie, parseCookies } from "nookies"
import profile from "@/styles/profile.module.css"
import style from "@/styles/listausuarios.module.css"
import axios from "axios";
import Treino from "@/components/enviarTreino"
import Informacoes from "@/components/editInformacoes"
import RemoveTreino from "@/components/excluirTreino"

export default function Profile(retorno) {
    const { user, signOut } = useContext(AuthContext)
    const [objSelecionada, setObjSelecionada] = useState([])
    const [treinoSelecionado, setTreinoSelecionado] = useState({})
    const [openTreino, setOpenTreino] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)
    const [cpfFormatado, setCpfFormatado] = useState('');
    const [telefoneFormatado, setTelefoneFormatado] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (user && user.cpf) {
            const cpfOriginal = user.cpf;
            const cpfFormatado = formatarCPF(cpfOriginal);
            setCpfFormatado(cpfFormatado);
        }
        if (user && user.telefone) {
            const telefoneOriginal = user.telefone;
            const telefoneFormatado = formatarTelefone(telefoneOriginal);
            setTelefoneFormatado(telefoneFormatado);
        }
    }, [user]);

    function formatarSexo(sexo) {
        switch (sexo) {
            case 'f':
                return 'Mulher';
            case 'm':
                return 'Homem';
            case 'o':
                return 'Outro';
            default:
                return '';
        }
    }

    function formatarCPF(cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');

        // Aplicar a formatação desejada
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

        return cpf;
    }

    function formatarTelefone(telefone) {
        // Remover caracteres não numéricos
        telefone = telefone.replace(/\D/g, '');

        // Aplicar a formatação desejada
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

        return telefone;
    }

    const capitalizeFL = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    const formatarData = (data) => {
        const dataObj = new Date(data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <main>
            <div className={style.container}>
                <div className={profile.telaFixa}>
                    <div className={style.parteGerente}>
                        <div className={style.divUsuario}>
                            <svg className={style.icon} onClick={() => router.push('/dashboard/profile')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>
                            <h1>{user?.nome}</h1>
                        </div>
                       
                        <button className={style.divsair} onClick={signOut}>
                            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.875 46.375H11.0417C9.87029 46.375 8.7469 45.9097 7.91861 45.0814C7.09033 44.2531 6.625 43.1297 6.625 41.9583V11.0417C6.625 9.87029 7.09033 8.7469 7.91861 7.91861C8.7469 7.09033 9.87029 6.625 11.0417 6.625H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M35.3333 37.5416L46.3749 26.5L35.3333 15.4583" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M46.375 26.5H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>SAIR</p>
                        </button>
                    </div>
                </div>
                <div className={profile.containerGeral}>
                    {user?.cargo ?
                        <div className={profile.container}>  
                            <div className={profile.informacoes}>
                                <h1 className="font-bold text-xl">Dados Pessoais</h1>
                                <p><b>ID:</b> {user?.idpessoa}</p>
                                <p><b>Nome:</b> {user?.nome}</p>
                                <p><b>CPF:</b> {cpfFormatado}</p>
                                <p><b>Email:</b> {user?.email}</p>
                                <p><b>Sexo:</b> {formatarSexo(user?.sexo)}</p>
                                <p><b>Nascimento:</b> {formatarData(user?.nascimento)}</p>
                                <p><b>Telefone:</b> {telefoneFormatado}</p>
                                <p><b>Salário:</b> R$ {user?.salario}</p>
                                <p><b>Data de Admissao:</b> {formatarData(user?.dataAdmissao)}</p>
                                <p><b>Data de Pagamento:</b> {formatarData(user?.dataPagamento).slice(0, 5)}</p>
                                <p><b>Cargo:</b> {capitalizeFL(user?.cargo)}</p>
                                <button className=" rounded-lg p-[10px] bg-red-500 text-white" onClick={() => {
                                        setObjSelecionada(user)
                                        setOpenEdit(true)
                                        }}>Editar Dados Pessoais</button>
                            </div>
                            {user?.cargo == 'atendente' ?
                                <h1>
                                    <button className=" rounded-lg p-[10px] bg-red-500 text-white">Cadastrar Clientes</button>
                                </h1>
                                :
                                <div>
                                    {user?.cargo == 'instrutor' ?
                                        <div>
                                            <button className=" rounded-lg p-[10px] bg-red-500 text-white mb-2"
                                            onClick={() => {
                                                setOpenTreino(true)
                                            }}>ENVIAR TREINO</button>
                                            <h1 className={profile.titulo}>Treinos</h1>
                                            {retorno.instrutor.length <= 0 ?
                                                <div>Você não enviou nenhum treino</div>
                                                :
                                                <div className={profile.tabelaTreinos}>
                                                    <table>
                                                    <thead>
                                                        <tr className={profile.tabelaCabecalho}>
                                                            <th className={profile.cabecalho}>Autor</th>
                                                            <th className={profile.cabecalho}>Descrição</th>
                                                            <th className={profile.cabecalho}>Ação</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {retorno?.instrutor?.map((instrutor) => (
                                                            <tr key={instrutor.idtreino} className={profile.linha}>
                                                                <td className={profile.dados}>{instrutor.nomeCliente}</td>
                                                                <td className={profile.dados}>{instrutor.descricao}</td>
                                                                <td className={profile.dadosAcao}>
                                                                <a href={instrutor.link} target="_blank">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                                                </a>
                                                                <a onClick={()=> {
                                                                    setTreinoSelecionado(instrutor.idtreino)
                                                                    setOpenRemove(true)
                                                                }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    </table>
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div>
                                            {user?.cargo == 'gerente' ?
                                                <div>
                                                    <button className="rounded-lg p-[10px] bg-red-500 text-white" onClick={() => router.push('/dashboard/funcionarios')}> Funcionários</button>
                                                    <button className={`rounded-lg p-[10px] bg-red-500 text-white ${profile.botaoGerente}`} onClick={() => router.push('/dashboard/clientes')}> Clientes</button>
                                                    <button className="rounded-lg p-[10px] bg-red-500 text-white" onClick={() => router.push('/dashboard/financeiro')}> Financeiro</button>
                                                </div>
                                                :
                                                <div>
                                                Funcionário Lascado
                                                </div>}
                                        </div>}
                                </div>}
                        </div>
                        :
                        <div className={profile.container}>
                            <div className={profile.informacoes}>
                                <h1>Dados Pessoais</h1>
                                <p><b>Nome:</b> {user?.nome}</p>
                                <p><b>Sexo:</b> {formatarSexo(user?.sexo)}</p>
                                <p><b>Data de nascimento:</b> {formatarData(user?.nascimento)}</p>
                                <p><b>CPF:</b> {cpfFormatado}</p>
                                <p><b>Telefone:</b> {telefoneFormatado}</p>
                                <p><b>Email:</b> {user?.email}</p>
                                <button className=" rounded-lg p-[10px] bg-red-500 text-white" onClick={() => {
                                        setObjSelecionada(user)
                                        setOpenEdit(true)
                                        }}>Editar Dados Pessoais</button>
                            </div>

                            <h1 className={profile.titulo}>Treinos</h1>
                            {retorno.treino.length <= 0 ?
                                <div>Você não possui treinos</div>
                                :
                                <div className={profile.tabelaTreinos}>
                                    <table>
                                    <thead>
                                        <tr className={profile.tabelaCabecalho}>
                                            <th className={profile.cabecalho}>Autor</th>
                                            <th className={profile.cabecalho}>Descrição</th>
                                            <th className={profile.cabecalho}>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {retorno?.treino?.map((treino) => (
                                            <tr key={treino.idtreino} className={profile.linha}>
                                                <td className={profile.dados}>{treino.nomeAutor}</td>
                                                <td className={profile.dados}>{treino.descricao}</td>
                                                <td className={profile.dadosAcao}>
                                                <a href={treino.link} target="_blank" onClick={() => console.log(user)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                                </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    }
                </div>
                <Treino isOpen={openTreino} setCloseTreino={() => setOpenTreino(!openTreino)}/>
                <Informacoes isOpen={openEdit} setCloseEdit={() => setOpenEdit(!openEdit)} informacoes={objSelecionada} />
                <RemoveTreino isOpen={openRemove} setCloseModal={() => setOpenRemove(!openRemove)} idTreino={treinoSelecionado}/>
            </div>
        </main>
    )
}

export async function getServerSideProps(ctx) {
    const { ['gympro-token']: token } = parseCookies(ctx)
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const { data: instrutor } = await axios.post('http://localhost:3333/getTreinosInstrutor', { token: token })
    const { data: treino } = await axios.post('http://localhost:3333/getTreinos', { token: token })
    return {
        props: {
            treino, instrutor
        }
    }
}