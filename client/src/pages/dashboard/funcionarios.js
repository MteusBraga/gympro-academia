import axios from "axios";
import { useEffect, useState } from "react";

export default function Funcionario() {
    const [funcionario, setFuncionario] = useState([])
    useEffect(() => {
        trazerDados()
    }, [])

    const trazerDados = async () => {
        const { data } = await axios.get('http://localhost:3333/listaFuncionario')
        console.log(data)
        setFuncionario(data)
    }

    return (
        <main className="text-black">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Salário</th>
                        <th>Sexo</th>
                        <th>Data de Nascimento</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Admissão</th>
                        <th>Data de pagamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionario.map(items => {
                        return (
                            <tr>
                                <td>{items.nome}</td>
                                <td>{items.cargo}</td>
                                <td>{items.salario}</td>
                                <td>{items.sexo}</td>
                                <td>{items.nascimento}</td>
                                <td>{items.cpf}</td>
                                <td>{items.email}</td>
                                <td>{items.telefone}</td>
                                <td>{items.dataAdmissao}</td>
                                <td>{items.dataPagamento}</td>
                                <td className="flex gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}