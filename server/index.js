const Cliente = require('./classes/cliente');
const Funcionario = require('./classes/funcionario')
const Atendente = require('./classes/atendente')
const Gerente = require('./classes/gerente')
const Usuario = require('./classes/usuario');
const { randomUUID } = require('crypto')
const Autenticacao = require('./classes/autenticacao')
const express = require('express');
const cors = require('cors');
const queryDB = require('./dbconnetion');
const transactionDB = require('./transacao')
const app = express();

const cliente = new Cliente()
const funcionario = new Funcionario()
const atendente = new Atendente()
const usuario = new Usuario()
const autenticacao = new Autenticacao()
const gerente = new Gerente()


app.use(cors());

// Middleware para fazer o parsing de requisições com Content-Type 'application/json'
app.use(express.json()); 

app.post('/cadastroClientes',async (req, res)=>{
    // console.log(req.body)
    atendente.createCliente(req.body)

    res.status(204).send()
})

app.post('/cadastroFuncionarios',async (req, res)=>{
    
    // console.log(req.body)
    gerente.createFuncionario(req.body)

    res.status(204).send()
})

app.post('/cadastroModalidade', async (req, res)=>{

    gerente.createModalidade(req.body)
    res.status(204).send()
})

app.get('/planos', async (req, res)=>{
    const result = await queryDB({
        query:'select * from plano'
    })

    res.send(result)
})

app.get('/modalidades', async (req, res)=>{
    const result = await queryDB({
        query:'select * from modalidade'
    })

    res.send(result)
})

app.post('/getLogin', async (req, res)=>{
    const { email, senha } = req.body

    //TESTANDO CLIENTE
    // const cliente = new Cliente()
    // await cliente.setCliente(email, senha)
    console.log(cliente.getCliente())
    // res.send(cliente.getCliente())

    //TESTANDO FUNCIONARIO
    // const funcionario = new Funcionario()
    // await funcionario.setFuncionario(email, senha)
    console.log(funcionario.getFuncionario())
    // res.send(funcionario.getFuncionario())

    //TESTANDO AUTENTICACAO
    const user = await autenticacao.fazerLogin(email, senha)
    console.log(user)
    res.send(user)
})

app.get('/financeiro', async (req, res)=>{
    res.send(await gerente.obterFinancas())
})


app.get('/listaFuncionario', async (req, res)=>{
    const lista_funcionario = await queryDB({
        query:`SELECT
        p.idpessoa AS idPessoa,
        p.nome,
        f.cargo,
        f.salario,
        p.sexo,
        p.nascimento,
        p.cpf,
        p.email,
        p.telefone,
        f.dataAdmissao,
        f.dataPagamento,
        p.senha
            FROM
        funcionario f
        JOIN pessoa p ON f.pessoa_idpessoa = p.idpessoa;
        `
    })

    res.send(lista_funcionario)
})

app.get('/listaCliente', async (req, res)=>{
    const search = req.query.search
    const clientes = await atendente.listarClientes(search)
    res.send(clientes)
})

app.post('/listarDataCliente', async (req, res)=>{
    const {dataInit, dataFim} = req.body
    const lista_funcionario = await queryDB({
        query:`SELECT p.nome,
        p.email,
        pa.formaPagamento,
        pa.dataPagamento,
        pl.valor,
        pl.tipo,
        pl.pacote
        FROM pagamento pa
        JOIN cliente c ON pa.cliente_idcliente = c.idcliente
        JOIN pessoa p ON c.pessoa_idpessoa = p.idpessoa
        JOIN plano pl ON c.plano_idplano = pl.idplano
        WHERE pa.dataPagamento >= ? AND pa.dataPagamento <= ? order by pa.dataPagamento;
        `,
        values : [
            dataInit,
            dataFim
        ]
    })
    

    res.send(lista_funcionario)
})

app.post('/apagarUsuario', async (req, res) => {
    const id = req.body.idPessoa
    const query1 = `DELETE FROM treino WHERE cliente_idcliente IN (SELECT idcliente FROM cliente WHERE pessoa_idpessoa = '${id}');`;
    const query2 = `DELETE FROM pagamento WHERE cliente_idcliente IN (SELECT idcliente FROM cliente WHERE pessoa_idpessoa = '${id}');`
    const query3 = `DELETE FROM cliente WHERE pessoa_idpessoa = '${id}';`
    const query4 = `DELETE FROM funcionario WHERE pessoa_idpessoa = '${id}';`
    const query5 = `DELETE FROM pessoa WHERE idpessoa = '${id}';`

    await transactionDB({query1:query1, query2:query2, query3:query3, query4:query4, query5:query5});
    res.status(204).send()
})

app.post('/editarCliente', async (req, res) => {
    // console.log(req.body)
    atendente.editarCliente(req.body)

    res.status(204).send()
})

app.post('/editarFuncionario', async (req, res) => {
    // console.log(req.body)
    gerente.editarFuncionario(req.body)

    res.status(204).send()
})

app.post('/recuperarUsuario', async (req, res)=>{
    const { token } = req.body
    const user  = await autenticacao.recuperarUsuario(token)
    // console.log(user)
    res.send(user)
})

app.post('/criarPlanos', async(req,res)=>{
    // console.log(req.body)
    gerente.createPlano(req.body)

    res.status(204).send()
})

app.listen(3333, ()=>{
    // console.log('ligou menó')
})

app.post('/criarPlanos', async(req,res)=>{
    // console.log(req.body)
    gerente.createPlano(req.body)

    res.status(204).send()
})

app.post('/renovarMatricula', async(req,res)=>{
    // console.log(req.body)
    atendente.renovarMatricula(req.body)

    res.status(204).send()
})

app.post('/getTreinos', async(req, res)=>{
    const id = req.body.token

    const treinos = await queryDB({ 
        query: `
        SELECT treino.*, pessoa.nome AS nomeAutor
        FROM treino
        JOIN pessoa ON treino.autor = pessoa.idpessoa
        WHERE treino.cliente = ?;
        `, 
        values: [id]
    })
    console.log(treinos)
    res.send(treinos)
})

app.post('/getTreinosInstrutor', async(req, res)=>{
    const id = req.body.token

    const treinos = await queryDB({ 
        query: `
        SELECT treino.*, pessoa.nome AS nomeCliente
        FROM treino
        JOIN pessoa ON treino.cliente = pessoa.idpessoa
        WHERE treino.autor = ?;
        `, 
        values: [id]
    })
    console.log(treinos)
    res.send(treinos)
})

app.post('/mandaTreino', async (req,res)=>{
    const instrutorId = req.body.instrutorId
    const clienteId = req.body.clienteId
    const link = req.body.link
    const descricao = req.body.descricao
    const idtreino = randomUUID()
    queryDB({
        query:"insert into treino (idtreino, link, autor, cliente, descricao) values (?,?,?,?,?);",
        values: [idtreino, link, instrutorId, clienteId, descricao]
    })

    res.send()
})

app.post('/removeTreino', async (req,res)=>{
    const resposta = req.body
    await queryDB({
        query:`DELETE FROM treino
        WHERE idtreino = ?;
        `,
        values: [resposta.idTreino]
    })

    res.send()
})


app.post('/editInformacoes', async (req, res)=>{
    const cliente = req.body
    
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
            cliente.nome, 
            cliente.sexo, 
            cliente.nascimento, 
            cliente.cpf, 
            cliente.email, 
            cliente.telefone, 
            cliente.senha,
            cliente.idpessoa
        ]
    })

    res.send()
})