const mysql = require('mysql2/promise');

class DatabaseAdapter {
    constructor(config) {
        this.config = config;
        this.db = null;
    }

    async connect() {
        this.db = await mysql.createConnection(this.config);
        this.db.connect();
    }

    async query(query, values) {
        try {
            const result = await this.db.execute(query, values);
            return result[0];
        } catch (err) {
            console.log("==========================");
            console.log("ERROR NA EXECUÇÃO DA QUERY");
            console.log("==========================");
            console.log("                          ");
            console.log(err);
            console.log("                          ");
            console.log("FIM DO ERRO...............");
        }
    }

    end() {
        this.db.end();
    }
}

module.exports = DatabaseAdapter;