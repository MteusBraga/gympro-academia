const {queryDB} = require('../dbconnetion')

class Financeiro {

    faturamentoVista
    faturamentoParcelado
    faturamentoLiquido

    async ConstrutorFinanceiro(){
        await this.setFaturamentoLiquido()
        await this.setFaturamentoParcelado()
        await this.setFaturamentoVista()
    }

    async setFaturamentoVista() {
        this.faturamentoVista = await queryDB({
            query: `SELECT SUM(pl.valor) AS SomaValorVista
        FROM pagamento pa
        INNER JOIN plano pl ON pa.plano_idplano = pl.idplano
        WHERE MONTH(pa.dataPagamento) = MONTH(CURRENT_DATE()) AND YEAR(pa.dataPagamento) = YEAR(CURRENT_DATE());
        `
        })
    }

    
    async setFaturamentoParcelado() {
        this.faturamentoParcelado = await queryDB({
            query: `SELECT
                SUM(
                CASE
                    WHEN pl.pacote = 'Mensal' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 30 THEN pl.valor
                    WHEN pl.pacote = 'Trimestral' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 90 THEN pl.valor / 3
                    WHEN pl.pacote = 'Semestral' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 180 THEN pl.valor / 6
                    WHEN pl.pacote = 'Anual' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 365 THEN pl.valor / 12
                    ELSE 0
                    END
                ) AS SomaValorParcelado
                FROM pagamento pa
                INNER JOIN plano pl ON pa.plano_idplano = pl.idplano
                WHERE
                (
                (pl.pacote = 'Mensal' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 30)
                OR
                (pl.pacote = 'Trimestral' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 90)
                OR
                (pl.pacote = 'Semestral' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 180)
                OR
                (pl.pacote = 'Anual' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 365)
                );`
        })
    }

    
    async setFaturamentoLiquido(){
        this.faturamentoLiquido = await queryDB({
            query:`SELECT
            (SELECT SUM(pl.valor) AS SomaValorTotalPlanos
            FROM pagamento pa
            INNER JOIN plano pl ON pa.plano_idplano = pl.idplano
            WHERE MONTH(pa.dataPagamento) = MONTH(CURRENT_DATE()) AND YEAR(pa.dataPagamento) = YEAR(CURRENT_DATE())
            ) -
            (SELECT SUM(salario) AS SomaSalarios
            FROM funcionario
            ) AS TotalLiquido;    
            `
        })
    }
    
    getFaturamentoLiquido() {
        return this.faturamentoLiquido
    }
    getFaturamentoVista() {
        return this.faturamentoVista
    }
    getFaturamentoParcelado() {
        return this.faturamentoParcelado
    }
}

module.exports = Financeiro