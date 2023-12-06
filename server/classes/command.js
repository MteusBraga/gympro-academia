const queryDB = require('../dbconnetion')

class IEditarCommand{
    editar(pessoa){}
}

class EditarClientes extends IEditarCommand{
    async editar(pessoa){

        console.log(pessoa)
        const idPessoa = pessoa.idpessoa

        await queryDB({
            query: `UPDATE pessoa
                    SET
                        nome = ?,
                        sexo = ?,
                        nascimento = ?,
                        cpf = ?,
                        email = ?,
                        telefone = ?,
                        senha = ? 
                    WHERE
                        idpessoa = ?;
                `,
            values: [
                pessoa.nome, 
                pessoa.sexo, 
                pessoa.nascimento, 
                pessoa.cpf, 
                pessoa.email, 
                pessoa.telefone, 
                pessoa.senha,
                idPessoa
            ]
        })
        
    }
}

class EditarFuncionarios extends IEditarCommand{
    editar(pessoa){
        const idPessoa = pessoa.idpessoa

        async function inserir() {
            await queryDB({
                query: `UPDATE pessoa
                        SET
                            nome = ?,
                            sexo = ?,
                            nascimento = ?,
                            cpf = ?,
                            email = ?,
                            telefone = ?,
                            senha = ?
                        WHERE
                            idpessoa = ?;
                    `,
                values: [
                    pessoa.nome,
                    pessoa.sexo,
                    pessoa.nascimento,
                    pessoa.cpf,
                    pessoa.email,
                    pessoa.telefone,
                    pessoa.senha,
                    idPessoa
                ]
            })
            queryDB({
                query: `UPDATE funcionario
                        SET
                            cargo = ?,
                            salario = ?,
                            dataAdmissao = ?,
                            dataPagamento = ?
                        WHERE
                            pessoa_idpessoa = ?;
                    `,
                values: [
                    pessoa.cargo,
                    pessoa.salario,
                    pessoa.dataAdmissao,
                    pessoa.dataPagamento,
                    idPessoa
                ]
            })
        }
        inserir()
    }
}

module.exports = { IEditarCommand, EditarClientes, EditarFuncionarios }