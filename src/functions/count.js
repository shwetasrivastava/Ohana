var _ = require('lodash');

/** 
* Returns count of all the records by specified conditions
* @param {object} column_name
* @param {object} conditions
* 
*/
module.exports = function count(column_name, conditions) {

    let sql ;
    if (column_name) {
        sql = `SELECT COUNT(${column_name}) FROM ${this.table}`;
    }
    if (_.isObject(column_name)) {
        conditions = column_name;
        sql = `SELECT COUNT(*) FROM ${this.table}`;
    }
    if(!column_name){
        sql = `SELECT COUNT(*) FROM ${this.table}`;
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