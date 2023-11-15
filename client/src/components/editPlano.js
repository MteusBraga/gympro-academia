import { useForm } from "react-hook-form"
import axios from "axios";
import { useEffect, useState } from "react";

export default function modal({isOpen, setCloseModal}){
    if(isOpen){
        return(
            <div style={BACKGROUND_STYLE}>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg m-5" style={MODAL_STYLE}>
                    <h2 className="mt-5 mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Deseja EXCLUIR essa conta?</h2>
                    <form className="flex flex-col gap-3" action="submit" onSubmit={handleSubmit(async (data)=>{
                        await axios.post('http://localhost:3333/cadastroModalidade', {
                            nome: data.nome,
                            descricao: data.descricao
                        })
                        reset()
                        setCloseModal()
                    })}>
                    <button className="flex w-full justify-center rounded-full bg-red-600 px-1 py-2 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-span-2 w-24 m-auto" type="submit">SIM</button>
                    <button className="flex w-full justify-center rounded-full bg-red-600 px-1 py-2 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-span-2 w-24 m-auto" type="submit">NÃO</button>
                    </form>
                </div>
            </div>
        )
    }

    return null
}