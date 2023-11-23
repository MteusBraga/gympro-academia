const mysql = require('mysql2/promise')

const transactionDB = async (data) => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'gympro'
    })
    db.connect()
    try {
        await db.beginTransaction()
        await db.query(data.query1)
        await db.query(data.query2)
        await db.query(data.query3)
        await db.query(data.query4)
        await db.query(data.query5)
        await db.commit()
    } catch (err) {
        await db.rollback()
        console.log("==========================")
        console.log("ERROR NA EXECUÇÃO DA QUERY")
        console.log("==========================")
        console.log("                          ")
        console.log(err)
        console.log("                          ")
        console.log("FIM DO ERRO...............")
    }finally{
        db.end()
    }
}

module.exports = transactionDB
