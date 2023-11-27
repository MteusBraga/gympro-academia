const { randomUUID } = require('crypto')
const queryDB = require('../dbconnetion')
const Usuario = require('./usuario')

class Funcionario extends Usuario{
    async setFuncionario(email, senha){
        //result vem como array pq é um select
        const result = await queryDB({
            query:`
            select 
                pessoa.* , funcionario.* 
            from 
                pessoa inner join funcionario 
            on 
                pessoa.idpessoa = funcionario.pessoa_idpessoa
            where 
                email = ? and senha = ?;`,
            values: [email, senha]
        })
        const res = result[0]
        //infelizmente nao pode fazer this = res
        this.dados = res
    }
    
    async setFuncToken(token){
        const result = await queryDB({
            query:`
            select 
                pessoa.* , funcionario.* 
            from 
                pessoa inner join funcionario 
            on 
                pessoa.idpessoa = funcionario.pessoa_idpessoa
            where 
                idpessoa = ?`,
            values: [token]
        })
        const res = result[0]
        //infelizmente nao pode fazer this = res
        this.dados = res
    }

    getFuncionario(){
        //gambiarra de javascript
        const { dados } = this 
        return dados
    }

}

module.exports = Funcionario