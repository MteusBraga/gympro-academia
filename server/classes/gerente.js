const Atendente = require("./atendente");
const queryDB = require('../dbconnetion');
const { randomUUID } = require('crypto')
const FacadeFinanceiro = require('./facadeFinanceiro')
const PlanoBuilder = require(`./planoBuilder`)
const MensalBuilder = require('./planoBuilder')
const TrimestralBuilder = require('./planoBuilder')
const SemestralBuilder = require('./planoBuilder')
const AnualBuilder = require('./planoBuilder')
const {Cadastro} = require('./strategy')
const {CadastroPlano} = require('./strategy')
const {CadastroModalidade} = require('./strategy')
const {CadastroFuncionarios} = require('./strategy')

class Gerente extends Atendente{
    facadeFinanceiro = new FacadeFinanceiro()
    planoBuilder = new PlanoBuilder()
    cadastroFuncionarios = new CadastroFuncionarios()
    cadastroPlano = new CadastroPlano()
    cadastroModalidade = new CadastroModalidade()
    cadastro = new Cadastro()

    async createFuncionario(funcionario){
        this.cadastro.setServico(this.cadastroFuncionarios)
        this.cadastro.cadastrar(funcionario)
    }

    async createModalidade(modalidade){
        this.cadastro.setServico(this.cadastroModalidade)
        this.cadastro.cadastrar(modalidade)
    }

    async createPlano(plano) {
        this.cadastro.setServico(this.cadastroPlano)
        this.cadastro.cadastrar(plano)
    }
    
    async construirPlano(plano){
        await this.builder.buildTipo(plano.tipo)
        await this.builder.buildPacote()
        await this.builder.buildValor(plano.valor, plano.desconto)
        await this.builder.buildModalidades(plano.modalidade)
    }
    

    async obterFinancas(){
        await this.facadeFinanceiro.inicializarParametros()

        const dados = await this.facadeFinanceiro.obterDados()
        console.log(dados)
        
        return dados
    }
    
    async editarFuncionario(funcionario){     
        const idPessoa = funcionario.idpessoa

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
                    funcionario.nome, 
                    funcionario.sexo, 
                    funcionario.nascimento, 
                    funcionario.cpf, 
                    funcionario.email, 
                    funcionario.telefone, 
                    funcionario.senha,
                    idPessoa
                ]
            })
            queryDB({
                query: `UPDATE funcionario
                        SET
                            cargo = ?,
                            salario = ?,
                            dataAdmissao = ?,
                            dataPagamento = ?
                        WHERE
                            pessoa_idpessoa = ?;
                    `,
                values: [
                    funcionario.cargo,
                    funcionario.salario,
                    funcionario.dataAdmissao,
                    funcionario.dataPagamento, 
                    idPessoa 
                ]
            })
        }
        inserir()
    }

}

module.exports = Gerente