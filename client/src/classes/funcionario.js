import axios from "axios";

export class Funcionario {
    async trazerDados() {
        const { data } = await axios.get("http://localhost:3333/listaFuncionario");
        
        return data;
    }
}

export class ProxyCacheFuncionario {

    async trazerDados() {
        // Tenta obter os dados do localStorage
        let cachedData = localStorage.getItem("funcionarios");
        cachedData = JSON.parse(cachedData)
        if (cachedData) {
            // Se os dados estiverem em cache, retorna-os
            console.log('puxando do localStorage')
            return cachedData;
        } else {
            // Caso contrário, faz a requisição ao backend
            const funcionario = new Funcionario();
            const data = await funcionario.trazerDados();
        
            // Armazena os dados no localStorage para uso futuro
            localStorage.setItem("funcionarios", JSON.stringify(data));
            console.log('puxando do back')
            return data;
        }
        // const cliente = new Cliente();
        // const data = await cliente.trazerDados();
        // // const cachedData = localStorage.getItem("funcionarios");
        // localStorage.setItem("clientesFormatados", JSON.stringify(data));
        // const cachedData = localStorage.getItem("clientesFormatados")
        // console.log('cachedData',JSON.parse(cachedData))
        // // console.log(data)
    }
}