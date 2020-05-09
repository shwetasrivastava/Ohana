var _ = require('lodash');

/** 
* 
* returns average of the records by specified conditions
* @param {object} column_name
* @param {object} conditions
* 
*/
module.exports = function max(column_name, conditions) {

    let sql ;
    let arguments = [];
    let index = 0;
    if (column_name && _.isString(column_name)) {
        sql = `SELECT MAX(${column_name}) FROM ${this.table}`;
    }
    else{
        throw 'missing column name or icorrectly passed; MAX(column_name)';
    }
   
    if (conditions && _.isObject(conditions)) {
        for (let [key, value] of Object.entries(conditions)) {
            key = '"' + key + '"';
            console.log(key);
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