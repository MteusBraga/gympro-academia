const Cliente = require('./classes/cliente');
const Funcionario = require('./classes/funcionario')
const Usuario = require('./classes/usuario');
const Autenticacao = require('./classes/autenticacao')
const express = require('express');
const cors = require('cors');
const queryDB = require('./dbconnetion');
const app = express();

const cliente = new Cliente()
const funcionario = new Funcionario()
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

app.post('/cadastroFuncionarios',async (req, res)=>{
    console.log(req.body)
    funcionario.create(req.body)

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

app.get('/financeiro', async (req, res)=>{
    const faturamento_vista = await queryDB({
        query:`SELECT SUM(pl.valor) AS SomaValorVista
        FROM pagamento pa
        INNER JOIN plano pl ON pa.plano_idplano = pl.idplano
        WHERE MONTH(pa.dataPagamento) = MONTH(CURRENT_DATE()) AND YEAR(pa.dataPagamento) = YEAR(CURRENT_DATE());
        `
    })
    
    const faturamento_parcelado = await queryDB({
        query:`SELECT
        SUM(
            CASE
                WHEN pl.pacote = 'Mensal' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 30 THEN pl.valor
                WHEN pl.pacote = 'Trimestral' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 90 THEN pl.valor / 3
                WHEN pl.pacote = 'Semestral' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 180 THEN pl.valor / 6
                WHEN pl.pacote = 'Anual' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 365 THEN pl.valor / 12
                ELSE 0
                END
        ) AS SomaValorParcelado
        FROM pagamento pa
    INNER JOIN plano pl ON pa.plano_idplano = pl.idplano
    WHERE
    (
        (pl.pacote = 'Mensal' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 30)
        OR
        (pl.pacote = 'Trimestral' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 90)
        OR
        (pl.pacote = 'Semestral' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 180)
        OR
        (pl.pacote = 'Anual' AND DATEDIFF(CURRENT_DATE(), pa.dataPagamento) <= 365)
        );`
    })
    
    
    const faturamento_liquido = await queryDB({
        query:`SELECT
        (SELECT SUM(pl.valor) AS SomaValorTotalPlanos
        FROM pagamento pa
        INNER JOIN plano pl ON pa.plano_idplano = pl.idplano
        WHERE MONTH(pa.dataPagamento) = MONTH(CURRENT_DATE()) AND YEAR(pa.dataPagamento) = YEAR(CURRENT_DATE())
        ) -
        (SELECT SUM(salario) AS SomaSalarios
        FROM funcionario
        ) AS TotalLiquido;    
        `
    })

    
    const total_planos = await queryDB({
        query:`SELECT pl.tipo AS NomePlano, COUNT(c.plano_idplano) AS QuantidadeAssociacoes
        FROM cliente c
        JOIN plano pl ON c.plano_idplano = pl.idplano
        GROUP BY pl.tipo;        
        `
    })
    
    const qnt_cliente = await queryDB({
        query:`SELECT COUNT(*) AS QuantidadeTotalClientes
        FROM cliente;
        `
    })

    const qnt_cliente_g = await queryDB({
        query:`SELECT
        SUM(CASE WHEN p.sexo = 'M' THEN 1 ELSE 0 END) AS QuantidadeHomens,
        SUM(CASE WHEN p.sexo = 'F' THEN 1 ELSE 0 END) AS QuantidadeMulheres
        FROM cliente c
        JOIN pessoa p ON c.pessoa_idpessoa = p.idpessoa;    
        `
    })

    const result_financeiro = {...faturamento_vista[0], ...faturamento_parcelado[0], ...faturamento_liquido[0], total_planos:total_planos, ...qnt_cliente[0], ...qnt_cliente_g[0]}
    res.send(result_financeiro)
})


app.get('/listaFuncionario', async (req, res)=>{
    const lista_funcionario = await queryDB({
        query:`SELECT p.nome,
        f.cargo,
        f.salario,   
        p.sexo,
        p.nascimento,
        p.cpf,
        p.email,
        p.telefone,
        f.dataAdmissao,
        f.dataPagamento
        FROM funcionario f
        JOIN pessoa p ON f.pessoa_idpessoa = p.idpessoa;        
        `
    })

    res.send(lista_funcionario)
})

app.get('/listaCliente', async (req, res)=>{
    const lista_funcionario = await queryDB({
        query:`SELECT p.nome AS nome,
        p.sexo AS sexo,
        p.nascimento AS DataNascimento,
        p.cpf AS cpf,
        p.email AS email,
        p.telefone AS telefone,
        pl.tipo AS TipoPlano,
        pl.pacote AS PacotePlano
        FROM cliente c
        JOIN pessoa p ON c.pessoa_idpessoa = p.idpessoa
        JOIN plano pl ON c.plano_idplano = pl.idplano;
        `
    })

    res.send(lista_funcionario)
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

app.post('/recuperarUsuario', async (req, res)=>{
    const { token } = req.body
    const user  = await autenticacao.recuperarUsuario(token)
    console.log(user)
    res.send(user)
})

app.listen(3333, ()=>{
    console.log('ligou menó')
})
