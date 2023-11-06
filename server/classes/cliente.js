const { randomUUID } = require('crypto')
const queryDB = require('../dbconnetion')
const Usuario = require('./usuario')

class Cliente extends Usuario{
    
    async setCliente(email, senha){
        //result vem como array pq é um select
        const result = await queryDB({
            query:`
            select 
                pessoa.* , cliente.* 
            from 
                pessoa inner join cliente 
            on 
                pessoa.idpessoa = cliente.pessoa_idpessoa
            where 
                email = ? and senha = ?;`,
            values: [email, senha]
        })
        const res = result[0]

        this.dados = res
    }

    async setClienToken(token){
        const result = await queryDB({
            query:`
            select 
                pessoa.* , cliente.* 
            from 
                pessoa inner join cliente 
            on 
                pessoa.idpessoa = cliente.pessoa_idpessoa
            where 
                idpessoa = ?`,
            values: [token]
        })
        const res = result[0]
        //infelizmente nao pode fazer this = res
        this.dados = res
    }

    getCliente(){
        //gambiarra de javascript
        const { dados } = this 
        return dados
    }


    create(cliente){
        const pessoaId = randomUUID()
        
        async function inserir(){
            await queryDB({
                query: 'insert into pessoa (idpessoa, nome, sexo, nascimento, cpf, telefone, email, senha) values (?, ?, ?, ?, ?, ?, ?, ?)',
                values: [
                    pessoaId, 
                    cliente.nome, 
                    cliente.sexo, 
                    cliente.nascimento, 
                    cliente.cpf, 
                    cliente.telefone, 
                    cliente.email, 
                    cliente.senha
                ]
            })
            queryDB({
                query: 'insert into cliente (plano_idplano, pessoa_idpessoa) values(?, ?)',
                values: [
                    cliente.plano_idplano, 
                    pessoaId 
                ]
            })
        }
        inserir()
    }

}

module.exports = Cliente