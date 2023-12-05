import { useForm } from "react-hook-form"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
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

export default function edit({isOpen, setCloseEdit, informacoes}){
    const router = useRouter()
    const [selectedValue, setSelectedValue] = useState()
    const [selectedSexo, setSelectedSexo] = useState(informacoes && informacoes.sexo === 'F' ? 'f' : (informacoes && informacoes.sexo === 'M' ? 'm' : 'o'));
    const form = useForm()
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    useEffect(() => {AOS.init();}, [])

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // Atualiza o estado com o valor selecionado
    };

    /*
    
    */
   useEffect(() => {
       if (informacoes) {
           // Coloca as informações automaticamente nos inputs, tratei da data e do tipo do plano de maneira específica
           setValue('nome', informacoes.nome);

           if (informacoes.sexo === 'm') {
            setSelectedSexo('m');
            } else if (informacoes.sexo === 'f') {
                setSelectedSexo('f');
            } else {
                setSelectedSexo('o'); // Adicionado para lidar com "Outros"
            }
            
           if (informacoes.nascimento) {setValue('nascimento', informacoes.nascimento.split('T')[0]);}
           setValue('cpf', informacoes.cpf);
           setValue('telefone', informacoes.telefone);
           setValue('email', informacoes.email);
           setValue('salario', informacoes.salario);
           setValue('senha', informacoes.senha);
           if (informacoes.dataAdmissao) {setValue('admissao', informacoes.dataAdmissao.split('T')[0]);}
           if (informacoes.dataPagamento) {setValue('pagamento', informacoes.dataPagamento.split('T')[0]);}

           if (informacoes.cargo) {
            const cargoFormatado = informacoes.cargo.charAt(0).toUpperCase() + informacoes.cargo.slice(1);
            setSelectedValue(cargoFormatado);}
       }
   }, [informacoes, setValue, setSelectedValue]);    


    if(isOpen){
        return(
            <div style={BACKGROUND_STYLE}>
                <div style={MODAL_STYLE} className="mt-7 m-5 sm:mx-auto sm:w-full sm:max-w-lg bg-white p-5 rounded-lg">
                    <button data-aos="zoom-in" data-aos-delay="150" style={BOTAO_STYLE} onClick={() => {
                        setCloseEdit()
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                    </button>
                    <h2 data-aos="zoom-in" data-aos-delay="150" className="mt-2 mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">EDITAR FUNCIONÁRIO</h2>
                    <form data-aos="zoom-in" data-aos-delay="150" className="flex flex-col" action="submit" onSubmit={handleSubmit(async (data)=>{
                        await axios.post('http://localhost:3333/editarFuncionario', {
                            idpessoa: informacoes.idPessoa,
                            nome: data.nome,
                            sexo: selectedSexo,
                            nascimento: data.nascimento,
                            cpf: data.cpf,
                            email: data.email,
                            telefone: data.telefone,
                            senha: data.senha,
                            cargo: selectedValue,
                            salario: data.salario,
                            dataAdmissao: data.admissao,
                            dataPagamento: data.pagamento
                        })
                        localStorage.removeItem("funcionarios")
                        setCloseEdit()
                        router.reload()
                    })}>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Nome</label>
                                <input className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" type="text" required {...register("nome")}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Sexo</label>
                                <select
                                    className="block w-full rounded-md border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                    required
                                    {...register("sexo")}
                                    value={selectedSexo}
                                    onChange={(e) => setSelectedSexo(e.target.value)}
                                >
                                    <option value="m">Homem</option>
                                    <option value="f">Mulher</option>
                                    <option value="o">Outros</option>
                                </select>
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
            </div>
        )
    }

    return null
}