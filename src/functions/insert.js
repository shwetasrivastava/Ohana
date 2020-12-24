     /**
     * Inserts a single record in the table
     * 
     * @param {object} data
     * 
     */
     module.exports = function insert(data) {
        if (_.isUndefined(data) || _.isEmpty(data) || !_.isObject(data)) {
            throw 'data is empty,not defined or is not an object';
        }
        if (!_.keys(data) || !_.values(data)) {
            throw 'keys or values not passed';
        }
        const keys = Object.keys(data).map((key) => { return '"' + key + '"' });
        const values = Object.values(data).map(value => {
            if(typeof value === "string" && !!value) return `'${value}'`;
            return value;
        });
        let sql = `INSERT INTO ${this.table} (${keys}) VALUES(${values})`;
        return new Promise((resolve, reject) => {
            connect.exec(sql, [], function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }