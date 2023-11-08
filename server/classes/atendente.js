const Funcionario = require('./funcionario')
const queryDB = require('../dbconnetion')
const { randomUUID } = require('crypto')

class Atendente extends Funcionario{
    listarClientes(){

    }

    editarCliente(){

    }

    deleteCliente(){

    }

    addCliente(){

    }

    async createCliente(cliente){
        const pessoaId = randomUUID()
        
        async function inserir(){
            await queryDB({
                query: 'insert into pessoa (idpessoa, nome, sexo, nascimento, cpf, telefone, email, senha) values (?, ?, ?, ?, ?, ?, ?, ?)',
                values: [
                    pessoaId, 
                    cliente.nome, 
                    cliente.sexo, 
                    cliente.nascimento, 
                    cliente.cpf, 
                    cliente.telefone, 
                    cliente.email, 
                    cliente.senha
                ]
            })
            queryDB({
                query: 'insert into cliente (plano_idplano, pessoa_idpessoa) values(?, ?)',
                values: [
                    cliente.plano_idplano, 
                    pessoaId 
                ]
            })
        }
        inserir()
    }
}


module.exports = Atendente