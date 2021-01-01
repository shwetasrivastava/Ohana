    var _ = require('underscore');

    /**
     * 
     * Updates records that matches the specified conditions with given values
     * 
     * @param {object} conditions
     * @param {object} values
     * 
     */
    module.exports = function update(conditions, values) {
        if (_.isUndefined(conditions)) {
            throw 'Conditions are undefined.';
        }
        if (_.isUndefined(values)) {
            throw 'Values are undefined.';
        }
        if (_.isEmpty(values)) {
            throw 'Empty vvalues are not allowed.';
        }
        if (!_.isObject(conditions) || !_.isObject(values)) {
            throw 'Conditions are not passed as object';
        }
        if (!_.isObject(values)) {
            throw 'Values are not passed as object';
        }

        if (!_.keys(values) || !_.values(values)) {
            throw 'keys or values not passed';
        }

        let sql = `UPDATE ${this.table}`;
        let index = 0;
        let i = 0;
        let arguments = [];

        for (let [key, value] of Object.entries(values)) {
            if (index === 0) {
                sql = sql + ` SET ${key} = ?`;
            } else {
                sql = sql + ` ,${key} = ?`
            }
            index++;
            arguments.push(value);
        }


        for (let [key, value] of Object.entries(conditions)) {
            key = '"' + key + '"';

            if (i === 0) {
                sql = sql + ` WHERE ${key} = ?`;
            } else {
                sql = sql + ` AND ${key} = ?`
            }
            i++;
            arguments.push(value);
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