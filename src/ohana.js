const ohana = function (table) {
    this.table = table;

    // ORM functions
    this.find = function () {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${this.table}`;
            connect.exec(sql, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    this.findOne = function (conditions) {
        let sql = `SELECT * FROM ${this.table}`;
        let arguments = [];
        let index = 0;
        for (let [key, value] of Object.entries(conditions)) {
            if (index === 0) {
                sql = sql + `  WHERE ${key} = ?`;
            } else {
                sql = sql + ` AND ${key} = ?`
            }
            index++;
            arguments.push(value);
        }

        sql = sql + ' LIMIT 1';

        return new Promise((resolve, reject) => {
            connect.exec(sql, arguments, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows[0]);
                }
            });
        });
    }

    this.update = function (conditions, values) {
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

    this.delete = function (conditions) {
        let sql = `DELETE FROM ${this.table}`;
        let arguments = [];
        let index = 0;
        for (let [key, value] of Object.entries(conditions)) {
            if (index === 0) {
                sql = sql + `  WHERE ${key} = ?`;
            } else {
                sql = sql + ` AND ${key} = ?`
            }
            index++;
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

    this.insert = function (data) {
        let sql = `INSERT INTO ${this.table} (${Object.keys(data)}) VALUES(${Object.values(data)})`;
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

    this.batchInsert = function (data) {
        let valuesPlaceHolder = new Array(Object.keys(data[0]).length).fill('?').join();
        let sql = `INSERT INTO ${this.table}("${Object.keys(data[0])}") VALUES('${valuesPlaceHolder}')`;
        let arguments = [];
        for (let i = 0; i < data.length; i++) {
            arguments.push(Object.values(data[i]));
        }

        let statement = connect.prepare(sql);
        return new Promise((resolve, reject) => {
            connect.execBatch(statement, arguments, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    this.findOneOrCreate = async function (conditions, values) {
        let result = await this.findOne(conditions);
        if (result) {
            return result;
        }
        else if (!result) {
            let data = {
                ...conditions,
                ...values
            }
            let result_insert = await this.insert(data);
            return result_insert;
        }
    }

    this.raw = async function (statement) {
        let sql = await statement;
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

    this.updateOrCreate = async function (conditions, values) {
        let result = await this.update(conditions, values);
        if (result) {
            return result;
        } else if (result === 0) {
            let data = {
                ...conditions,
                ...values
            };
            let result_create = await this.insert(data);
            return result_create;
        }
    }

}

module.exports = ohana;