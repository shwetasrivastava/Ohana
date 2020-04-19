const hana = require('@sap/hana-client');
const conn = hana.createConnection();

const connect = (params) => {
    return new Promise((resolve, reject) => {
        conn.connect(params, function(err) {
            if (err) {
                reject(err);
            } else {
                console.log('Connected to hana db.');
                global.connect = conn;
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

module.exports = {
    connect,
    disconnect
}