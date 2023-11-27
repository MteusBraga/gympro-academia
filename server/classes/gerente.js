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
    
}

module.exports = Gerente