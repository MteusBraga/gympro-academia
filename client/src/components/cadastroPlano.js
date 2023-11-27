import { useForm } from "react-hook-form"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

export default function modal({isOpen, setClosePlano}) {
    const router = useRouter()
    useEffect(() => {AOS.init();}, [])

    const [modalidades, setModalidades] = useState([])
    const form = useForm()
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (selectedCheckboxes.includes(value)) {
          // Remove the checkbox from the array if already selected
          setSelectedCheckboxes(selectedCheckboxes.filter((checkbox) => checkbox !== value));
        } else {
          // Add the checkbox to the array if not selected
          setSelectedCheckboxes([...selectedCheckboxes, value]);
        }
      };
      

    useEffect(()=>{
        const getModalidades = async () => {
            try{
                const { data } = await axios.get('http://localhost:3333/modalidades');
                setModalidades(data)
            }catch(e){
                console.log(e)
            }
          };
      
          getModalidades();
    }, [])


    if(isOpen){
        return(
            <div style={BACKGROUND_STYLE}>
                <div data-aos="zoom-in" data-aos-delay="150" className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg m-5" style={MODAL_STYLE}>
                    <button data-aos="zoom-in" data-aos-delay="150" style={BOTAO_STYLE} onClick={() => {
                        console.log(selectedCheckboxes)
                        setSelectedCheckboxes([]);
                        setClosePlano()
                        reset()
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                    </button>
                    <h2 data-aos="zoom-in" data-aos-delay="150" className="mt-5 mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">CADASTRO PLANO</h2>
                    <form data-aos="zoom-in" data-aos-delay="150" className="flex flex-col gap-3" action="submit" onSubmit={handleSubmit(async (data)=>{
                        await axios.post('http://localhost:3333/criarPlanos', {
                            tipo: data.nome,
                            valor: data.valor,
                            desconto: data.desconto,
                            modalidades: selectedCheckboxes
                        })
                        setSelectedCheckboxes([]);
                        setClosePlano()
                        reset()
                        router.reload()
                    })}>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Nome</label>
                            <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("nome")}/>
                        </div>
                        <div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Valor</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-4 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">R$</span>
                                    </div>
                                </div>
                                <input className="block w-full rounded-md border-0 py-1 pl-9 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" type="text" required {...register("valor")}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1 mt-2">Desconto Pacote</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-4 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">%</span>
                                    </div>
                                </div>
                                <input className="block w-full rounded-md border-0 py-1 pl-9 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" required {...register("desconto")}/>
                            </div>
                        </div>
                        <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900 mb-1 mt-2">Modalidades</label>
                            <div className="modalidades-container max-h-24 overflow-y-auto">
                                <div className="checkbox-container">
                                    {modalidades.map((modalidade) => (
                                    <div key={modalidade.idmodalidade} className="flex items-center">
                                        <input
                                        type="checkbox"
                                        value={modalidade.idmodalidade}
                                        onChange={handleCheckboxChange}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        />
                                        <label className="ml-2">{modalidade.nome}</label>
                                    </div>
                                    ))}
                                </div>
                            </div>
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
