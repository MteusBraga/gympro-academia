const Funcionario = require('./funcionario')
const queryDB = require('../dbconnetion')
const { randomUUID } = require('crypto')

class Atendente extends Funcionario{
    async listarClientes(search){
        if(search){
            const lista_funcionario = await queryDB({
                query:`SELECT p.nome AS nome,
                p.sexo AS sexo,
                p.nascimento AS DataNascimento,
                p.cpf AS cpf,
                p.email AS email,
                p.telefone AS telefone,
                pl.tipo AS TipoPlano,
                pl.pacote AS PacotePlano
                FROM cliente c
                JOIN pessoa p ON c.pessoa_idpessoa = p.idpessoa
                JOIN plano pl ON c.plano_idplano = pl.idplano
                WHERE nome LIKE '%${search}%' `,
                values:[search]
            })
            return lista_funcionario
        }else{
            const lista_funcionario = await queryDB({
                query:`SELECT p.nome AS nome,
                p.sexo AS sexo,
                p.nascimento AS DataNascimento,
                p.cpf AS cpf,
                p.email AS email,
                p.telefone AS telefone,
                pl.tipo AS TipoPlano,
                pl.pacote AS PacotePlano
                FROM cliente c
                JOIN pessoa p ON c.pessoa_idpessoa = p.idpessoa
                JOIN plano pl ON c.plano_idplano = pl.idplano;
                `
            })
            return lista_funcionario
        }
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