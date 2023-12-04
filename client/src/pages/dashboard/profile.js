import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies } from "nookies"
import style from "@/styles/listausuarios.module.css";
import axios from "axios";

export default function Profile(retorno) {
    const { user } = useContext(AuthContext)

    const [cpfFormatado, setCpfFormatado] = useState('');
    const [telefoneFormatado, setTelefoneFormatado] = useState('')

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
    var dataOriginal = user?.nascimento;
    var dataConvertida = new Date(dataOriginal);

    // Extrair componentes de data
    var dia = dataConvertida.getUTCDate();
    var mes = dataConvertida.getUTCMonth() + 1; // Meses começam do zero, então adicionamos 1
    var ano = dataConvertida.getUTCFullYear();
    var dataFormatada = dia + '/' + mes + '/' + ano;

    return (
        <main>
            <div className={style.container}>
                <div className={style.telaFixa}>
                    <div className={style.parteGerente}>
                        <div className={style.divUsuario}>
                            <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>
                            <h1>{user?.nome}</h1>
                        </div>
                       
                        <button className={style.divsair} onClick={() => router.push('/')}>
                            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.875 46.375H11.0417C9.87029 46.375 8.7469 45.9097 7.91861 45.0814C7.09033 44.2531 6.625 43.1297 6.625 41.9583V11.0417C6.625 9.87029 7.09033 8.7469 7.91861 7.91861C8.7469 7.09033 9.87029 6.625 11.0417 6.625H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M35.3333 37.5416L46.3749 26.5L35.3333 15.4583" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M46.375 26.5H19.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>SAIR</p>
                        </button>
                    </div>
                </div>
                <div>
                    {user?.cargo ?
                        <div>  
                            <h1 className="font-bold text-xl">Dados Pessoais</h1>
                            <p>ID: {user?.idpessoa}</p>
                            <p>Nome: {user?.nome}</p>
                            <p>CPF: {user?.cpf}</p>
                            <p>Email: {user?.email}</p>
                            <p>Sexo: {user?.sexo}</p>
                            <p>Nascimento: {dataFormatada}</p>
                            <p>Telefone: {telefoneFormatado}</p>
                            <p>Salário: R$ {user?.salario}</p>
                            <p>Data de Admissao: {user?.dataAdmissao}</p>
                            <p>Data de Pagamento: {user?.dataPagamento}</p>
                            <p>Cargo: {user?.cargo}</p>
                            <button className=" rounded-lg p-[10px] bg-red-500 text-white">Editar Dados Pessoais</button>
                            {user?.cargo == 'atendente' ?
                                <h1>
                                    <button className=" rounded-lg p-[10px] bg-red-500 text-white">CADASTRAR CLIENTES</button>
                                </h1>
                                :
                                <div>
                                    {user?.cargo == 'instrutor' ?
                                        <div>
                                            <button className=" rounded-lg p-[10px] bg-red-500 text-white">ENVIAR TREINO</button>
                                        </div>
                                        :
                                        <div>
                                            {user?.cargo == 'gerente' ?
                                                <div>
                                                <button className="rounded-lg p-[10px] bg-red-500 text-white"> Funcionários</button>
                                                <button className="rounded-lg p-[10px] bg-red-500 text-white"> Clientes</button>
                                                <button className="rounded-lg p-[10px] bg-red-500 text-white"> Financeiro</button>
                                                </div>
                                                :
                                                <div>
                                                funcionario lascado
                                                </div>}
                                        </div>}
                                </div>}
                        </div>
                        :
                        <div>
                            <h1>Dados Pessoais cliente</h1>
                            <p>Nome: {user?.nome}</p>
                            <p>Sexo: {user?.sexo}</p>
                            <p>Data de nascimento: {dataFormatada}</p>
                            <p>CPF: {cpfFormatado}</p>
                            <p>Telefone: {telefoneFormatado}</p>
                            <p>Email: {user?.email}</p>
                            <button className="p-[10px] bg-red-500 cursor-pointer text-white" > Editar</button>
                            <h1 className="font-bold text-xl">Treinos</h1>
                            {retorno.treino.length <= 0 ?
                                <div>voce nao possui treinos</div>
                                :
                                retorno?.treino?.map((treino) => {
                                    return (
                                        <div className=" p-[10px]">
                                            <p>Autor (Instrutor): {treino.autor}</p>
                                            <p>Descricao: {treino.descricao}</p>
                                            <p>Link: {treino.link}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                    {console.log(retorno.treino)}
                </div>
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


    const { data: treino } = await axios.post('http://localhost:3333/getTreinos', { token: token })
    console.log(treino)


    return {
        props: {
            treino
        }
    }
}