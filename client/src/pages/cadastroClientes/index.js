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
        <main className=''>
            <h1>CADASTRO CLIENTES</h1>
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
                <label className="">nome</label>
                <input className="text-black" type="text" required {...register("nome")}/>
                <label>sexo</label>
                <input className="text-black" type="text" required {...register("sexo")}/>
                <label>Data de nascimento</label>
                <input type="date" required {...register("nascimento")}/>
                <label>cpf</label>
                <input className="text-black" type="text" required {...register("cpf")}/>
                <label>telefone</label>
                <input className="text-black" type="text" required {...register("telefone")}/>
                <label>email</label>
                <input className="text-black" type="email" required {...register("email")}/>
                <label>senha</label>
                <input className="text-black" type="password" required {...register("senha")}/>
                <label>plano</label>

                <select id='options' value={selectedValue} onChange={handleSelectChange} className="text-black">
                    {
                        planos.map((plano)=>{
                            return(
                                <option value={plano.idplano}>{plano.tipo}, {plano.pacote}, R$ {plano.valor}</option>
                            )
                        })
                    }
                </select>

                
                <button type="submit">submit</button>
            </form>
        </main>
    )
}
