import { useForm } from "react-hook-form"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format, parse } from 'date-fns';

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

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function edit({isOpen, setCloseRev, informacoes}){
    const router = useRouter()
    const [planos, setPlanos] = useState([])
    const [selectedValue, setSelectedValue] = useState();
    const [selectedPagamento, setSelectedPagamento] = useState();
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    useEffect(() => {AOS.init();}, [])

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

    useEffect(() => {
        // Pré-selecionar a data atual
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        setValue('pagamento', formattedDate);

        // Pré-selecionar o plano atual
        if (informacoes.tipoPlano && informacoes.pacotePlano) {
            const selectedPlan = planos.find(
                (plano) =>
                    plano.tipo === informacoes.tipoPlano &&
                    plano.pacote === informacoes.pacotePlano
            );
            if (selectedPlan) {
                setSelectedValue(selectedPlan.idplano);
            }
        }
    }, [informacoes, planos, setValue]);

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // Atualiza o estado com o valor selecionado
    };

    const handleSelectChangeTipo = (event) => {
        setSelectedPagamento(event.target.value); // Atualiza o estado com o valor selecionado
    };

    if(isOpen){
        return(
            <div style={BACKGROUND_STYLE}>
                <div className="mt-7 m-5 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg" style={MODAL_STYLE}>
                    <button data-aos="zoom-in" data-aos-delay="150" style={BOTAO_STYLE} onClick={() => {
                        console.log(informacoes)
                        setCloseRev()
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                    </button>
                    <h2 data-aos="zoom-in" data-aos-delay="150" className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Renovação de Matrícula</h2>
                    <h3 data-aos="zoom-in" data-aos-delay="150" className="mt-0 mb-5 text-center text-lg leading-9 tracking-tight text-gray-900">{informacoes.nome}</h3>
                    <form data-aos="zoom-in" data-aos-delay="150" className="flex flex-col" action="submit" onSubmit={handleSubmit(async (data)=>{
                        await axios.post('http://localhost:3333/renovarMatricula', {
                            idPlano: selectedValue,
                            idCliente: informacoes.idCliente,
                            formaPagamento: selectedPagamento,
                            dataPagamento: data.pagamento
                        })
                        localStorage.removeItem("clientesFormatados")
                        setCloseRev()
                        router.reload()
                    })}>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Data de Pagamento</label>
                                <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" placeholder="Select date" type="date" required {...register("pagamento")}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Tipo de Pagamento</label>
                                <select id='options' value={selectedPagamento} onChange={handleSelectChangeTipo} className="block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-white-300 sm:text-sm sm:leading-6">
                                    <option>Boleto Bancário</option>
                                    <option>Transferência Bancária</option>
                                    <option>Cartão de Crédito</option>
                                    <option>Dinheiro</option>
                                </select>
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
            </div>
        )
    }

    return null
}