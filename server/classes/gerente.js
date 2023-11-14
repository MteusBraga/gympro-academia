const Atendente = require("./atendente");
const queryDB = require('../dbconnetion');
const { randomUUID } = require('crypto')

class Gerente extends Atendente{
    async createFuncionario(funcionario){
        const pessoaId = randomUUID()
        
        async function inserir(){
            await queryDB({
                query: 'insert into pessoa (idpessoa, nome, sexo, nascimento, cpf, telefone, email, senha) values (?, ?, ?, ?, ?, ?, ?, ?)',
                values: [
                    pessoaId, 
                    funcionario.nome, 
                    funcionario.sexo, 
                    funcionario.nascimento, 
                    funcionario.cpf, 
                    funcionario.telefone, 
                    funcionario.email, 
                    funcionario.senha
                ]
            })
            queryDB({
                query: "INSERT INTO funcionario (cargo, salario, dataAdmissao, dataPagamento, pessoa_idpessoa) VALUES (?, ?, ?, ?, ?)",
                values: [
                    funcionario.cargo,
                    funcionario.salario,
                    funcionario.dataAdmissao,
                    funcionario.dataPagamento,
                    pessoaId
                ]
            })
        }
        inserir()
        }

    async createModalidade(modalidade){
        async function inserir(){
            await queryDB({
                query: 'INSERT INTO modalidade (nome, descricao) VALUES (?, ?)',
                values: [
                    modalidade.nome,
                    modalidade.descricao
                ]
            })
        }
        inserir()
    }
}

module.exports = Gerente