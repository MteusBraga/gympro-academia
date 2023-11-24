import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import axios from "axios";
import style from "@/styles/listausuarios.module.css";
import { useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/dist/server/api-utils";

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function CadastroFuncionario(){
    const router = useRouter()
    const [selectedValue, setSelectedValue] = useState('1')
    const form = useForm()
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    const { user, signOut} = useContext(AuthContext)

    useEffect(() => {AOS.init();}, [])

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // Atualiza o estado com o valor selecionado
        console.log(setSelectedValue(event.target.value))
    };
    return(
        <main className="flexdps items-center justify-center">
            <div className="mt-7 m-5 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg">
                <button data-aos="zoom-in" data-aos-delay="200" className={style.voltar} onClick={() => router.push('/dashboard/funcionarios')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                        <path d="M12 19l-7-7 7-7M5 12h14"></path></svg>
                    <p className="ml-2">Voltar</p>
                </button>
                <h2 data-aos="zoom-in" data-aos-delay="200" className="mt-2 mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">CADASTRO FUNCIONÁRIO</h2>
                <form data-aos="zoom-in" data-aos-delay="200" className="flex flex-col" action="submit" onSubmit={handleSubmit(async (data)=>{
                    console.log(data)
                    console.log('valor selecionado '+ selectedValue)
                    await axios.post('http://localhost:3333/cadastroFuncionarios', {
                        nome: data.nome,
                        sexo: getValues("sexo"),
                        nascimento: data.nascimento,
                        cpf: data.cpf,
                        telefone: data.telefone,
                        email: data.email,
                        senha: data.senha,
                        cargo: selectedValue,
                        salario: data.salario,
                        dataAdmissao: data.admissao,
                        dataPagamento: data.pagamento
                    })
                    localStorage.removeItem("funcionarios")
                    reset();
                })}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Nome</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("nome")}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Sexo</label>
                            <input className="w-3.5 h-4" type="radio" value="m"required {...register("sexo")} checked/>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800">Homem</label>
                            <input className="w-3.5 h-4 ml-2" type="radio" value="f" required {...register("sexo")}/>
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800">Mulher</label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Data de nascimento</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" placeholder="Select date" type="date" required {...register("nascimento")}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">CPF</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("cpf")}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Telefone</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("telefone")}/>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1" placeholder="you@example.com">Email</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" placeholder="you@example.com" type="email" required {...register("email")}/>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Senha</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="password" required {...register("senha")}/>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Salário</label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-4 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">R$</span>
                                </div>
                            </div>
                            <input className="block w-full rounded-md border-0 py-1 pl-9 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" type="text" required {...register("salario")}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Data de admissão</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" placeholder="Select date" type="date" required {...register("admissao")}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Data de pagamento</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" placeholder="Select date" type="date" required {...register("pagamento")}/>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Cargo</label>
                            <select id='options' value={selectedValue} onChange={handleSelectChange} className="block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-white-300 sm:text-sm sm:leading-6">
                                <option>Atendente</option>
                                <option>Instrutor</option>
                                <option>Gerente</option>
                                <option>Zelador</option>
                            </select>
                        </div>

                        <button className="flex w-full justify-center rounded-full bg-red-600 px-1 py-2 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-span-2 w-24 m-auto" type="submit">submit</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

/*export function getServerSideProps (ctx) {
    const { ['gympro-token']: token } = parseCookies(ctx)
    if(!token){
        return{
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }

    return{
        props:{
            
        }
    }
}*/