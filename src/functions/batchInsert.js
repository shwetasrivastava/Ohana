    var _ = require('underscore');

     /**
     * 
     * Inserts a multiple records in the table
     * 
     * @param {object[]} data
     * 
     */
     module.exports = function batchInsert(data) {
        if (_.isUndefined(data) || _.isEmpty(data) || !_.isArray(data)) {
            throw 'data is empty,not defined or is not an array';
        }
        if (!_.keys(data) || !_.values(data)) {
            throw 'keys or values not passed';
        }

        const keys = Object.keys(data[0]).map((key) => { return '"' + key + '"' });
        let valuesPlaceHolder = new Array(Object.keys(data[0]).length).fill('?').join();
        let sql = `INSERT INTO ${this.table}(${keys}) VALUES(${valuesPlaceHolder})`;
        let arguments = [];
        for (let i = 0; i < data.length; i++) {
            arguments.push(Object.values(data[i]));
        }
        let statement = connect.prepare(sql);    
        return new Promise((resolve, reject) => {
            statement.execBatch(arguments, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });   
    }
