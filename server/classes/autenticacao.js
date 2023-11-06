const Cliente = require('./cliente')
const Funcionario = require('./funcionario')


class Autenticacao {
    cliente = new Cliente()
    funcionario = new Funcionario()
    ehCliente = false
    ehFuncionario = false

    async fazerLogin(email, senha) {

        await this.cliente.setCliente(email, senha)

        await this.funcionario.setFuncionario(email, senha)
        //verifica se é cliente
        if (!(this.cliente.dados == undefined)) {
            if (this.cliente.dados.email == email && this.cliente.dados.senha == senha) {
                this.ehCliente = true
                return this.cliente.getCliente()
            }
        }
        //verifica se é funcionario
        if (!(this.funcionario.dados == undefined)) {
            if (this.funcionario.dados.email == email && this.funcionario.dados.senha == senha) {
                this.ehFuncionario = true
                return this.funcionario.getFuncionario()
            }
        }

        //se nao for nenhum dos dois retorna mensagem
        if (!(this.ehCliente && this.ehFuncionario)) {
            return undefined
        }
    }

    async recuperarUsuario(token) {
        await this.cliente.setClienToken(token)

        await this.funcionario.setFuncToken(token)

        //verifica se é cliente
        if (!(this.cliente.dados == undefined)) {
            if (this.cliente.dados.idpessoa == token) {
                this.ehCliente = true
                return this.cliente.getCliente()
            }
        }
        //verifica se é funcionario
        if (!(this.funcionario.dados == undefined)) {
            if (this.funcionario.dados.idpessoa == token) {
                this.ehFuncionario = true
                return this.funcionario.getFuncionario()
            }
        }
    }
}

module.exports = Autenticacao