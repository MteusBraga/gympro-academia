const Cliente = require('./cliente');
const express = require('express');
const cors = require('cors');
const queryDB = require('./dbconnetion');
const app = express();

const cliente = new Cliente()



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
    const result = await queryDB({
        query: "select * from pessoa where email = ? and senha = ?",
        values: [email, senha]
    })
    console.log(result)
    res.send(result)
})

app.listen(3333, ()=>{
    console.log('ligou menó')
})