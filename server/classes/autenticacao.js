const Cliente = require('./cliente')
const Funcionario = require('./funcionario')


class Autenticacao {
    cliente = new Cliente()
    funcionario = new Funcionario()

    async fazerLogin(email, senha) {
        
        
        await this.cliente.setCliente(email, senha)
        
        await this.funcionario.setFuncionario(email, senha)

        if (this.cliente.dados.email == email && this.cliente.dados.senha == senha){
            return this.cliente.getCliente()
        }
        if (this.funcionario.dados.email == email && this.funcionario.dados.senha == senha){
            return this.funcionario.getFuncionario()
        }
    }

    async recuperarUsuario(token){
        await this.cliente.setClienToken(token)
        
        await this.funcionario.setFuncToken(token)

        if (this.cliente.dados.idpessoa == token){
            return this.cliente.getCliente()
        }
        if (this.funcionario.dados.idpessoa == token){
            return this.funcionario.getFuncionario()
        }
    }
}

module.exports = Autenticacao