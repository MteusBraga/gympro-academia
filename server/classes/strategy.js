const queryDB = require('../dbconnetion')
const { randomUUID } = require('crypto')
//Context
class Cadastro{
    setServico(servico){
        this.servico = servico
        console.log('servico',servico)
    }
    cadastrar(body){
        this.servico.cadastrar(body)
    }
}
//Strategy
class CadastroServico{
    cadastrar(body){}
}

//Concrete Strategy
class CadastroPlano extends CadastroServico{
    async cadastrar(plano){
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
    
}
class CadastroModalidade extends CadastroServico{
    cadastrar(modalidade){
        async function inserir(){
        await queryDB({
            query: 'INSERT INTO modalidade (nome, descricao) VALUES (?, ?)',
            values: [
                modalidade.nome,
                modalidade.descricao
            ]
        })
    }
    inserir()}
}
class CadastroFuncionarios extends CadastroServico{
    cadastrar(funcionario){
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
        inserir()}
}

module.exports = {
    Cadastro, 
    CadastroServico, 
    CadastroPlano, 
    CadastroModalidade, 
    CadastroFuncionarios
}
