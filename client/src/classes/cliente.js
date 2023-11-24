import axios from "axios";

export class Cliente {
    async trazerDados() {
        const { data } = await axios.get("http://localhost:3333/listaCliente");
        // Mapeia os dados e formata a data de nascimento
        const clientesFormatados = data.map((item) => ({
            ...item,
            DataNascimento: new Date(item.DataNascimento).toLocaleDateString(),
        }));
        return clientesFormatados;
    }
}

export class ProxyCacheCliente {

    async trazerDados() {
        // Tenta obter os dados do localStorage
        let cachedData = localStorage.getItem("clientesFormatados");
        cachedData = JSON.parse(cachedData)
        if (cachedData) {
            // Se os dados estiverem em cache, retorna-os
            console.log('puxando do localStorage')
            return cachedData;
        } else {
            // Caso contrário, faz a requisição ao backend
            const cliente = new Cliente();
            const data = await cliente.trazerDados();
        
            // Armazena os dados no localStorage para uso futuro
            localStorage.setItem("clientesFormatados", JSON.stringify(data));
            console.log('puxando do back')
            return data;
        }
        // const cliente = new Cliente();
        // const data = await cliente.trazerDados();
        // // const cachedData = localStorage.getItem("clientesFormatados");
        // localStorage.setItem("clientesFormatados", JSON.stringify(data));
        // const cachedData = localStorage.getItem("clientesFormatados")
        // console.log('cachedData',JSON.parse(cachedData))
        // // console.log(data)
    }
}