var _ = require('lodash');

/** 
* 
* returns average of the records by specified conditions
* @param {object} column_name
* @param {object} conditions
* 
*/
module.exports = function avg(column_name, conditions) {

    let sql ;
    if (column_name) {
        sql = `SELECT AVG(${column_name}) FROM ${this.table}`;
    }

    if(!column_name){
        throw new Error('pass the column_name based on which average will be calculated')
    }
    let arguments = [];
    let index = 0;

    if (conditions && _.isObject({ conditions })) {
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
            console.log(arguments);
        }
    }
    console.log(sql);
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