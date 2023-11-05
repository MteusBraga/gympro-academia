import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import axios from "axios";
import { useEffect, useState } from "react";
import style from '@/styles/CadastroCliente.module.css'

export default function CadastroClientes (){
    const [planos, setPlanos] = useState([])
    const [selectedValue, setSelectedValue] = useState('1')
    const form = useForm()
    const { register, handleSubmit, setValue, getValues, reset } = useForm();

    useEffect(()=>{
        const getPlanos = async () => {
            try{
                const { data } = await axios.get('http://localhost:3333/planos');
                setPlanos(data)
            }catch(e){
                console.log(e)
            }
          };
      
          getPlanos();
    }, [])

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // Atualiza o estado com o valor selecionado
    };
    return(
        <main className=" h-screen flexdps  items-center justify-center">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg">
                <h2 className="mt-5 mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">CADASTRO CLIENTE</h2>
                <form className="flex flex-col" action="submit" onSubmit={handleSubmit(async (data)=>{
                    console.log(data)
                    console.log('valor selecionado '+ selectedValue)
                    await axios.post('http://localhost:3333/cadastroClientes', {
                        nome: data.nome,
                        sexo: data.sexo,
                        nascimento: data.nascimento,
                        cpf: data.cpf,
                        telefone:data.telefone,
                        email: data.email,
                        senha: data.senha,
                        plano_idplano: selectedValue
                    })
                    reset();
                })}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Nome</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("nome")}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Sexo</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("sexo")}/>
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
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Plano</label>
                            <select id='options' value={selectedValue} onChange={handleSelectChange} className="block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-white-300 sm:text-sm sm:leading-6">
                                {
                                    planos.map((plano)=>{
                                        return(
                                            <option value={plano.idplano}>{plano.tipo}, {plano.pacote}, R$ {plano.valor}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <button className="flex w-full justify-center rounded-full bg-red-600 px-1 py-2 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-span-2 w-24 m-auto" type="submit">submit</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
