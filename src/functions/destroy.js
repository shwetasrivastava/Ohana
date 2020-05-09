var _ = require('lodash');

/**
* 
* Deletes records that matches the specified conditions
* 
* @param {object} conditions
* 
*/
module.exports = function destroy(conditions) {

    if (_.isUndefined(conditions) || _.isNaN(conditions)) {
        throw 'condition is not defined or not an object';
    }

    if (_.isEmpty(conditions)) {
        throw 'condition is empty';
    }

    if(_.isObject(conditions))
    {
        let sql = `DELETE FROM ${this.table}`;
        let arguments = [];
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