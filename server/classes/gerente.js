const Atendente = require("./atendente");
const queryDB = require('../dbconnetion');
const FacadeFinanceiro = require('./facadeFinanceiro')
const PlanoBuilder = require(`./planoBuilder`)
const MensalBuilder = require('./planoBuilder')
const TrimestralBuilder = require('./planoBuilder')
const SemestralBuilder = require('./planoBuilder')
const AnualBuilder = require('./planoBuilder')
const { Cadastro } = require('./strategy')
const { CadastroPlano } = require('./strategy')
const { CadastroModalidade } = require('./strategy')
const { CadastroFuncionarios } = require('./strategy');
const { EditarFuncionarios } = require("./command");

class Gerente extends Atendente {

    editFuncionarios = new EditarFuncionarios()
    facadeFinanceiro = new FacadeFinanceiro()

    async obterFinancas() {
        await this.facadeFinanceiro.inicializarParametros()

        const dados = await this.facadeFinanceiro.obterDados()
        console.log(dados)

        return dados
    }

    planoBuilder = new PlanoBuilder()


    cadastroFuncionarios = new CadastroFuncionarios()
    cadastroPlano = new CadastroPlano()
    cadastroModalidade = new CadastroModalidade()
    cadastro = new Cadastro()

    async createFuncionario(funcionario) {
        this.cadastro.setServico(this.cadastroFuncionarios)
        this.cadastro.cadastrar(funcionario)
    }

    async createModalidade(modalidade) {
        this.cadastro.setServico(this.cadastroModalidade)
        this.cadastro.cadastrar(modalidade)
    }

    async createPlano(plano) {
        this.cadastro.setServico(this.cadastroPlano)
        this.cadastro.cadastrar(plano)
    }

    async construirPlano(plano) {
        await this.builder.buildTipo(plano.tipo)
        await this.builder.buildPacote()
        await this.builder.buildValor(plano.valor, plano.desconto)
        await this.builder.buildModalidades(plano.modalidade)
    }


    async editarFuncionario(funcionario) {
        this.editFuncionarios.editar(funcionario)
    }

    async listarFuncionarios() {
        const lista_funcionario = await queryDB({
            query: `SELECT
            p.idpessoa AS idPessoa,
            p.nome,
            f.cargo,
            f.salario,
            p.sexo,
            p.nascimento,
            p.cpf,
            p.email,
            p.telefone,
            f.dataAdmissao,
            f.dataPagamento,
            p.senha
                FROM
            funcionario f
            JOIN pessoa p ON f.pessoa_idpessoa = p.idpessoa;
            `
        })
        return lista_funcionario
    }

}

module.exports = Gerente