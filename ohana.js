const hana = require('@sap/hana-client');
const conn = hana.createConnection();

const connect = (params) => {
    return new Promise((resolve, reject) => {
        conn.connect(params, function(err) {
            if (err) {
                reject(err);
            } else {
                console.log('Connected to hana db.');
                resolve();
            }
          });
    });
}

const disconnect = () => {
    return new Promise((resolve, reject) => {
        conn.disconnect(function(err) {
            if (err) {
                reject(err);
            } else {
                console.log('Disconnected');
                resolve();
            }
        });
    });
}

const ohana = (table) => {
    this.table = table;

    // ORM functions
    this.findById = (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ? WHERE id = ?`;
            conn.exec(sql, [this.table, id], function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = {
    connect,
    disconnect,
    ohana
}