const queryDB = require('../dbconnetion')

class Informacoes {

    async ConstrutorInformacoes(){
        await this.setTotalPlanos()
        await this.setQtdClientes()
        await this.setQtdClientesGenero()
        await this.setModalidades()
        await this.setPlanoModalidade()
        await this.setPlanosVencidos()
    }

    totalPlanos
    qtdClientes
    qtdClientesGenero
    modalidades
    planosModalidade
    planosVencidos

    async setPlanosVencidos() {
        this.planosVencidos = await queryDB({
            query: `SELECT
            c.idcliente AS idCliente,
            p.idpessoa AS idPessoa,
            p.nome,
            pl.tipo AS tipoPlano,
            pl.pacote AS pacotePlano,
            lastPayment.dataPagamento,
            CASE
                WHEN pl.pacote = 'Anual' THEN DATEDIFF(CURDATE(), lastPayment.dataPagamento) - 365
                WHEN pl.pacote = 'Semestral' THEN DATEDIFF(CURDATE(), lastPayment.dataPagamento) - 183
                WHEN pl.pacote = 'Trimestral' THEN DATEDIFF(CURDATE(), lastPayment.dataPagamento) - 91
                WHEN pl.pacote = 'Mensal' THEN DATEDIFF(CURDATE(), lastPayment.dataPagamento) - 30
                ELSE DATEDIFF(CURDATE(), lastPayment.dataPagamento) -- Trate outros casos conforme necessário
            END AS diasVencimento
        FROM
            cliente c
        JOIN
            pessoa p ON c.pessoa_idpessoa = p.idpessoa
        JOIN
            plano pl ON c.plano_idplano = pl.idplano
        JOIN
            (
                SELECT
                    p.idpagamento,
                    p.formaPagamento,
                    p.dataPagamento,
                    p.cliente_idcliente
                FROM
                    pagamento p
                WHERE
                    (p.cliente_idcliente, p.dataPagamento) IN (
                        SELECT
                            cliente_idcliente,
                            MAX(dataPagamento) AS dataPagamento
                        FROM
                            pagamento
                        GROUP BY
                            cliente_idcliente
                    )
            ) AS lastPayment ON c.idcliente = lastPayment.cliente_idcliente
        WHERE
            (
                (pl.pacote = 'Anual' AND DATEDIFF(CURDATE(), lastPayment.dataPagamento) > 365) OR
                (pl.pacote = 'Semestral' AND DATEDIFF(CURDATE(), lastPayment.dataPagamento) > 183) OR
                (pl.pacote = 'Trimestral' AND DATEDIFF(CURDATE(), lastPayment.dataPagamento) > 91) OR
                (pl.pacote = 'Mensal' AND DATEDIFF(CURDATE(), lastPayment.dataPagamento) > 30)
            );
        `
        })
    }

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
        SUM(CASE WHEN p.sexo = 'F' THEN 1 ELSE 0 END) AS QuantidadeMulheres,
        SUM(CASE WHEN p.sexo = 'O' THEN 1 ELSE 0 END) AS QuantidadeOutros
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

    getPlanosVencidos(){
        this.planosVencidos
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