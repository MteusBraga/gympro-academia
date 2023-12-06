import axios from "axios";

// Observer
class ICliente {
    update(treino) { }
}

// Concrete Observer
class Cliente extends ICliente {
    constructor(nome) {
        super();
        this.nome = nome;
    }

    async update(treino) {
        const { data: treinos } = await axios.post('http://localhost:3333/getTreinos', { token: treino.idcliente })
        return treinos
    }
}

// Subject
class IInstrutor {
    //vai cadastrar o treino
    async mandarTreino(treino) { }
    //vai usar o metodo do cliente
    notificarClienteNotify(cliente) { }
}

// Concrete Subject
class Instrutor extends IInstrutor {
    setClientes(){
        this.clientes = axios.get('http://localhost:3333/listaClientes')
    }
    async mandarTreino(treino) {
        await axios.post('http://localhost:3333/mandaTreino', {
            instrutorId: treino.idpessoa,
            clienteId: treino.clienteId,
            link: treino.link,
            descricao: treino.descricao
        })
    }

    notificarCliente(idcliente) { 
        this.clientes.forEach(cliente => {
            if(cliente.id = idcliente){
                cliente.update()
            }
        });
    }
}

// Treino
class Treino {
    constructor(idTreino, descricao, idInstrutor, idCliente) {
        this.idTreino = idTreino;
        this.descricao = descricao;
        this.idInstrutor = idInstrutor;
        this.idCliente = idCliente;
    }
}

// Exemplo de uso
const instrutor = new Instrutor(1);

const cliente1 = new Cliente("Cliente1");
const cliente2 = new Cliente("Cliente2");

instrutor.inscreverCliente(cliente1);
instrutor.inscreverCliente(cliente2);

const treinoDoDia = new Treino(1, "Treino de Cardio", 1, 101);

instrutor.mandarTreino(treinoDoDia);
