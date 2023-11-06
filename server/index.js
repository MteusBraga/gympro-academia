const Cliente = require('./classes/cliente');
const Funcionario = require('./classes/funcionario')
const Usuario = require('./classes/usuario');
const Autenticacao = require('./classes/autenticacao')
const express = require('express');
const cors = require('cors');
const queryDB = require('./dbconnetion');
const app = express();

const cliente = new Cliente()
const usuario = new Usuario()
const autenticacao = new Autenticacao()


app.use(cors());

// Middleware para fazer o parsing de requisições com Content-Type 'application/json'
app.use(express.json()); 

app.post('/cadastroClientes',async (req, res)=>{
    console.log(req.body)
    cliente.create(req.body)

    res.status(204).send()
})

app.get('/planos', async (req, res)=>{
    const result = await queryDB({
        query:'select * from plano'
    })

    res.send(result)
})

app.post('/getLogin', async (req, res)=>{
    const { email, senha } = req.body

    //TESTANDO CLIENTE
    // const cliente = new Cliente()
    // await cliente.setCliente(email, senha)
    // console.log(cliente.getCliente())
    // res.send(cliente.getCliente())

    //TESTANDO FUNCIONARIO
    // const funcionario = new Funcionario()
    // await funcionario.setFuncionario(email, senha)
    // console.log(funcionario.getFuncionario())
    // res.send(funcionario.getFuncionario())

    //TESTANDO AUTENTICACAO
    const user = await autenticacao.fazerLogin(email, senha)
    // console.log(user)
    res.send(user)


})

app.post('/recuperarUsuario', async (req, res)=>{
    const { token } = req.body
    const user  = await autenticacao.recuperarUsuario(token)
    console.log(user)
    res.send(user)
})

app.listen(3333, ()=>{
    console.log('ligou menó')
})