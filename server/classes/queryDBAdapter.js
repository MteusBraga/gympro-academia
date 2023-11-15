const DatabaseAdapter = require('./databaseAdapter');

class QueryDBAdapter {
    dbAdapter

    constructor(){
        this.dbAdapter = new DatabaseAdapter({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'teste'
        })
    }
    
    async fazerQuery(data){
        try {
            await this.dbAdapter.connect();
            console.log('aqui')
            this.result = await this.dbAdapter.query(data.query, data.values);

            return this.result
        } catch (error) {
            console.error('Erro na consulta:', error);
        } finally {
            this.dbAdapter.end();
        }
    }
    
}

module.exports = QueryDBAdapter