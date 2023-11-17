const queryDB = require('../dbconnetion')

class Informacoes {

    async ConstrutorInformacoes(){
        await this.setTotalPlanos()
        await this.setQtdClientes()
        await this.setQtdClientesGenero()
        await this.setModalidades()
        await this.setPlanoModalidade()
    }

    totalPlanos
    qtdClientes
    qtdClientesGenero
    modalidades
    planosModalidade

    async setTotalPlanos() {
        this.totalPlanos = await queryDB({
            query: `SELECT pl.tipo AS NomePlano, COUNT(c.plano_idplano) AS QuantidadeAssociacoes
        FROM cliente c
        JOIN plano pl ON c.plano_idplano = pl.idplano
        GROUP BY pl.tipo;        
        `
        })
    }

    async setQtdClientes() {
        this.qtdClientes = await queryDB({
            query: `SELECT COUNT(*) AS QuantidadeTotalClientes
            FROM cliente;
            `
        })
    }

    async setQtdClientesGenero() {
        this.qtdClientesGenero = await queryDB({
            query: `SELECT
        SUM(CASE WHEN p.sexo = 'M' THEN 1 ELSE 0 END) AS QuantidadeHomens,
        SUM(CASE WHEN p.sexo = 'F' THEN 1 ELSE 0 END) AS QuantidadeMulheres
        FROM cliente c
        JOIN pessoa p ON c.pessoa_idpessoa = p.idpessoa;    
        `
        })
    }

    async setModalidades(){
        this.modalidades = await queryDB({
        query: 'select nome, descricao from modalidade;'
        })
    }

    async setPlanoModalidade(){
        this.planosModalidade = await queryDB({
            query: `SELECT
            p.tipo AS plano,
            GROUP_CONCAT(DISTINCT m.nome ORDER BY m.nome) AS modalidades
        FROM
            vinc_plano_modalidade pm
        JOIN
            plano p ON pm.plano_idplano = p.idplano
        JOIN
            modalidade m ON pm.modalidade_idmodalidade = m.idmodalidade
        GROUP BY
            p.tipo;`
        })
    }

    getTotalPlanos(){
        this.totalPlanos
    }

    getQtdClientes(){
        this.qtdClientes
    }

    getQtdClientesGenero(){
        this.qtdClientesGenero
    }

    getModalidades(){
        this.modalidades
    }
    
    getPlanosModalidade(){
        this.planoModalidade
    }
}

module.exports = Informacoes