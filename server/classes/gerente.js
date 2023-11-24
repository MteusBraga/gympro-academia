const Atendente = require("./atendente");
const queryDB = require('../dbconnetion');
const { randomUUID } = require('crypto')
const FacadeFinanceiro = require('./facadeFinanceiro')
const PlanoBuilder = require(`./planoBuilder`)
const MensalBuilder = require('./planoBuilder')
const TrimestralBuilder = require('./planoBuilder')
const SemestralBuilder = require('./planoBuilder')
const AnualBuilder = require('./planoBuilder')

class Gerente extends Atendente{
    facadeFinanceiro = new FacadeFinanceiro()
    planoBuilder = new PlanoBuilder()

    // constructor(builder){
    //     this.builder = builder
    // }


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

    async createPlano(plano) {
        const pacoteM = 'Mensal';
        const pacoteT = 'Trimestral';
        const pacoteS = 'Semestral';
        const pacoteA = 'Anual';
    
        const tipo = plano.tipo;
        const valor = plano.valor;
        const desconto = plano.desconto;
        const modalidades = plano.modalidades;
    
        async function inserir(pacote, meses, multiplicador, idmodalidades) {
            const valorCalculado = (valor * meses) * (1 - (desconto * multiplicador / 100));
    
            const {insertId} = await queryDB({
                query: `
                    INSERT INTO plano (tipo, pacote, valor)
                    VALUES (?, ?, ?);
                `,
                values: [tipo, pacote, valorCalculado],
            });

            for(let i = 0; i < idmodalidades.length; i++){
                await queryDB({
                    query: `
                        INSERT INTO vinc_plano_modalidade (plano_idplano, modalidade_idmodalidade)
                        VALUES (?, ?);
                    `,
                    values: [insertId, idmodalidades[i]],
                });
            }
        }
    
        try {
            await inserir(pacoteM, 1, 0, modalidades);
            await inserir(pacoteT, 3, 1, modalidades);
            await inserir(pacoteS, 6, 2, modalidades);
            await inserir(pacoteA, 12, 3, modalidades);
    
            console.log('Inserções concluídas com sucesso');
        } catch (error) {
            console.error('Erro ao inserir dados no banco de dados:', error);
            throw error; // Rejeita a promise para indicar falha na execução da função
        }
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