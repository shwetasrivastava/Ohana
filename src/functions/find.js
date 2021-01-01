
var _ = require('underscore');

/** 
* 
* Returns the records that matches the specified conditions
* 
* @param {string} column_name
* @param {object} conditions
* 
*/
module.exports = function find(column_name, conditions) {
    let sql;
    let arguments = [];

    if(column_name && _.isArray(column_name)) {
        let arr = [];
        column_name.forEach((column) => {
            arr.push(
             column
            )
        });
        sql = `SELECT ${arr} FROM ${this.table}`;
    }   
    else { 
        conditions = column_name;
        sql = `SELECT * FROM ${this.table}`;
    }
    

    if (conditions && _.isObject(conditions)) {
        let index = 0;
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