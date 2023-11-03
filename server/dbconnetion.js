const mysql = require('mysql2/promise')

const queryDB = async (data) => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'teste'
    })
    db.connect()
    try {
        result = await db.execute(data.query, data.values)
        return (result[0])
    } catch (err) {
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

module.exports = queryDB
