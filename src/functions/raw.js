var _ = require('underscore');

/**
* 
* Run the give raw query against the table and returns the raw result
* 
* @param {string} statement - Raw query
* 
*/
module.exports = async function raw(statement) {
    let sql;

    if (_.isUndefined(statement) || _.isEmpty(statement)) {
        throw 'SQL statement is missing';
    }
    if (statement) {
        sql = await statement;
    } 
    return new Promise((resolve, reject) => {
        connect.exec(sql, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}