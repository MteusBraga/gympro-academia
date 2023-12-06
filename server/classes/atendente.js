const Funcionario = require('./funcionario')
const queryDB = require('../dbconnetion')
const { randomUUID } = require('crypto')
const QueryDBAdapter = require('./queryDBAdapter')
const { EditarClientes } = require('./command')

class Atendente extends Funcionario{
    editClientes = new EditarClientes()

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
        await this.editClientes.editar(cliente)
    }

    async renovarMatricula(matricula){     
        const idPlano = matricula.idPlano
        const idCliente = matricula.idCliente

        async function inserir(){
            await queryDB({
                query: `
                UPDATE cliente
                SET plano_idplano = ?
                WHERE idcliente = ?;
                `,
                values: [
                    idPlano,
                    idCliente
                ]
            })
            queryDB({
                query: `INSERT INTO pagamento (formaPagamento, dataPagamento, cliente_idcliente, plano_idplano)
                VALUES (?, ?, ?, ?);
                    `,
                values: [
                    matricula.formaPagamento,
                    matricula.dataPagamento,
                    idCliente,
                    idPlano
                ]
            })
        }
        inserir()
    }
}


module.exports = Atendente