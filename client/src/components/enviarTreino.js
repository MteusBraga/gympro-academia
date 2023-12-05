import { useForm } from "react-hook-form"
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { ProxyCacheCliente } from "@/classes/cliente";

import AOS from 'aos';
import 'aos/dist/aos.css';

const BACKGROUND_STYLE = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgb(0,0,0,0.7)',
    zindex: '1000'
}

const MODAL_STYLE = {
    position: 'fixed',
    top: '45%', // alterado para 50%
    left: '50%', // alterado para 50%
    transform: 'translate(-50%, -50%)', // corrigido para transform
    backgroundColor: 'white', // cor de fundo da div
    padding: '20px', // espaçamento interno
    zIndex: '1000',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
}

const BOTAO_STYLE = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
}

export default function modal({isOpen, setCloseTreino}){
    const router = useRouter()
    const form = useForm()
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    const [selectedValue, setSelectedValue] = useState();
    const [clientes, setClientes] = useState([])

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // Atualiza o estado com o valor selecionado
    };

    const { user } = useContext(AuthContext)
    useEffect(()=>{
        // trazerDados()
        setDados()
    }, [])

    const setDados = async () => {
        const proxyCliente = new ProxyCacheCliente();
        const c = await proxyCliente.trazerDados();
    
        setClientes(c);

        if (c.length > 0) {
            setSelectedValue(c[0].idPessoa);
        }
      };

    useEffect(() => {AOS.init();}, [])
    if(isOpen){
        return(
            <div style={BACKGROUND_STYLE}>
                <div data-aos="zoom-in" data-aos-delay="150" className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg m-5" style={MODAL_STYLE}>
                    <button data-aos="zoom-in" data-aos-delay="150" style={BOTAO_STYLE} onClick={() => {
                            console.log(user?.idpessoa)
                            console.log(selectedValue)
                            setCloseTreino()
                            reset()
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                    </button>
                    <h2 data-aos="zoom-in" data-aos-delay="150" className="mt-5 mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enviar Treino</h2>
                    <form data-aos="zoom-in" data-aos-delay="150" onSubmit={handleSubmit(async (data)=>{
                        console.log(typeof(idPessoa))
                        await axios.post('http://localhost:3333/mandaTreino', {
                            instrutorId: user?.idpessoa,
                            clienteId: selectedValue,
                            link: data.link,
                            descricao: data.descricao
                        })
                        setCloseTreino()
                        router.reload()
                    })}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">link</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("link")}/>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Descrição</label>
                            <textarea className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" rows="3" type="text" required {...register("descricao")}/>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Cliente</label>
                            <select
                                id='options'
                                value={selectedValue}
                                onChange={handleSelectChange}
                                className="block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-white-300 sm:text-sm sm:leading-6"
                            >
                                {clientes?.map((cliente) => (
                                    <option key={cliente.idPessoa} value={cliente.idPessoa}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="flex w-full justify-center rounded-full bg-red-600 px-1 py-2 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-span-2 w-24 m-auto" type="submit">submit</button>
                    </div>
                    </form>
                </div>
            </div>
        )
    }

    return null
}