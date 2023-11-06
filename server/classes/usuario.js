const queryDB = require("../dbconnetion")

class Usuario{

    async setUsuario(email, senha){
        //result vem como array pq é um select
        const result = await queryDB({
            query:"select * from pessoa where email = ? and senha = ?",
            values: [email, senha]
        })
        const data = result[0]
        //setando os atributos
        this.id = data.idpessoa
        this.nome = data.nome
        this.sexo = data.sexo
        this.nascimento = data.nascimento
        this.cpf = data.cpf
        this.telefone = data.telefone
        this.email = data.email
        this.senha = data.senha
    }
    getUsuario(){
        return this
    }
    
}

module.exports = Usuario