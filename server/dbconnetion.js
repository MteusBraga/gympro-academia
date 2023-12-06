const mysql = require('mysql2/promise')

class SingletonDatabaseConnection{
    constructor(){

    }

    static getInstance(){
        if(!this.instance){
            this.instance = new SingletonDatabaseConnection()
        }
        return this.instance;
    }

    async queryDB(data){
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
}

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

module.exports = {queryDB, SingletonDatabaseConnection}
