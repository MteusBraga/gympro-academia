const Informacoes = require('./informacoes')
const Financeiro = require ('./financeiro')

class FacadeFinanceiro{
    informacoes =  new Informacoes()
    financeiro = new Financeiro()
  
    async inicializarParametros(){
        await this.informacoes.ConstrutorInformacoes()
        await this.financeiro.ConstrutorFinanceiro()
    }
    
    // result_financeiro = {...faturamento_vista[0], 
    //     ...faturamento_parcelado[0], 
    //     ...faturamento_liquido[0], 
    //     total_planos:total_planos, 
    //     ...qnt_cliente[0], 
    //     ...qnt_cliente_g[0], 
    //     modalidade:modalidade, 
    //     planosModalidade:planosModalidade
    // }
    
    async obterDados(){

        const concat = {
            ...this.financeiro.faturamentoVista[0],
            ...this.financeiro.faturamentoParcelado[0],
            ...this.financeiro.faturamentoLiquido[0],
            total_planos:this.informacoes.totalPlanos,
            ...this.informacoes.qtdClientes[0],
            ...this.informacoes.qtdClientesGenero[0],
            modalidade:this.informacoes.modalidades,
            planosModalidade:this.informacoes.planosModalidade
        }
        return concat
    }

}

module.exports = FacadeFinanceiro