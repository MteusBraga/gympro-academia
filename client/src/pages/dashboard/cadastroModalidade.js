import { useForm } from "react-hook-form"
import axios from "axios";
import { useEffect, useState } from "react";

export default function CadastroModalidade() {
    const [planos, setPlanos] = useState([])
    const [selectedValue, setSelectedValue] = useState('1')
    const form = useForm()
    const { register, handleSubmit, setValue, getValues, reset } = useForm();

    return(
        <main className=" h-screen flexdps items-center justify-center">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg m-5">
                <h2 className="mt-5 mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">CADASTRO MODALIDADE</h2>
                <form className="flex flex-col gap-3" action="submit" onSubmit={handleSubmit(async (data)=>{
                    await axios.post('http://localhost:3333/cadastroModalidade', {
                        nome: data.nome,
                        descricao: data.descricao
                    })
                    reset();
                })}>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Nome</label>
                    <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("nome")}/>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Descrição</label>
                    <textarea className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" rows="3" type="text" required {...register("descricao")}/>
                </div>
                <button className="flex w-full justify-center rounded-full bg-red-600 px-1 py-2 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-span-2 w-24 m-auto" type="submit">submit</button>
                </form>
            </div>
        </main>
    )
}