var _ = require('underscore');

/** 
* 
* returns average of the records by specified conditions
* @param {object} column_name
* @param {object} conditions
* 
*/
module.exports = function min(column_name, conditions) {

    let sql ;
    let arguments = [];
    let index = 0;
    if (column_name && _.isString(column_name)) {
        sql = `SELECT MIN(${column_name}) FROM ${this.table}`;
    }
    else{
        throw 'missing column name or incorrectly passed; MIN(column_name)';
    }
   
    if (conditions && _.isObject(conditions)) {
        for (let [key, value] of Object.entries(conditions)) {
            key = '"' + key + '"';
            if (index === 0) {
                sql = sql + ` WHERE ${key} = ?`;
            } else {
                sql = sql + ` AND ${key} = ?`
            }
            index++;
            arguments.push(value);
        }
    }
    return new Promise((resolve, reject) => {
        connect.exec(sql, arguments, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}