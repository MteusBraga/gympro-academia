const Funcionario = require('./funcionario')
const queryDB = require('../dbconnetion')
const { randomUUID } = require('crypto')
const QueryDBAdapter = require('./queryDBAdapter')

class Atendente extends Funcionario{

    queryDB = new QueryDBAdapter()

    async listarClientes(search){
        if(search){
            const lista_funcionario = await this.queryDB.fazerQuery({
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
                query:`SELECT
                p.idpessoa AS idPessoa,
                p.nome AS nome,

                p.sexo AS sexo,
                p.nascimento AS DataNascimento,
                p.cpf AS cpf,
                p.email AS email,
                p.telefone AS telefone,
                p.senha AS senha,
                pl.tipo AS TipoPlano,
                pl.pacote AS PacotePlano
            FROM
                cliente c
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
        const formaPagamento = "Boleto"
        const dataAtual = new Date();
        var ano = dataAtual.getFullYear();
        var mes = dataAtual.getMonth() + 1;
        var dia = dataAtual.getDate();
        var dataFormatada = ano + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
        console.log(dataFormatada);
        const idPlano = cliente.plano_idplano

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

            const {insertId} = await queryDB({
                query: 'insert into cliente (plano_idplano, pessoa_idpessoa) values(?, ?)',
                values: [
                    idPlano, 
                    pessoaId 
                ]
            })

            queryDB({
                query: 'INSERT INTO pagamento (formaPagamento, dataPagamento, cliente_idcliente, plano_idplano) VALUES (?, ?, ?, ?)',
                values: [
                    formaPagamento,
                    dataFormatada,
                    insertId,
                    idPlano
                ]
            })
        }
        inserir()
    }

    async editarCliente(cliente){     
        const idPessoa = cliente.idpessoa

        async function inserir(){
            await queryDB({
                query: `UPDATE pessoa
                        SET
                            nome = ?,
                            sexo = ?,
                            nascimento = ?,
                            cpf = ?,
                            email = ?,
                            telefone = ?,
                            senha = ? 
                        WHERE
                            idpessoa = ?;
                    `,
                values: [
                    cliente.nome, 
                    cliente.sexo, 
                    cliente.nascimento, 
                    cliente.cpf, 
                    cliente.email, 
                    cliente.telefone, 
                    cliente.senha,
                    idPessoa
                ]
            })
            queryDB({
                query: `UPDATE cliente
                        SET
                            plano_idplano = ?
                        WHERE
                            pessoa_idpessoa = ?;
                    `,
                values: [
                    cliente.plano_idplano, 
                    idPessoa 
                ]
            })
        }
        inserir()
    }
}


module.exports = Atendente