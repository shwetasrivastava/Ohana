var _ = require('lodash');

const ohana = function (table) {

    if (_.isUndefined(table)) {
        throw new Error('Table name is not defined.');
    } else if (_.isEmpty(table)) {
        throw new Error('Table name is empty.');
    } else {
        this.table = table;
    }

    /**
     * findAll()
     * 
     * Returns all the records
     * 
     */
    this.findAll = function () {
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

    /**
     * findOne()
     * 
     * Returns the first record that matches the specified conditions
     * 
     * @param {object} conditions
     * 
     */
    this.findOne = function (conditions) {

        if (_.isUndefined(conditions)) {
            throw new Error('Conditions object is undefined');
        }

        if (!_.isObject(conditions)) {
            throw new Error('Conditions are not a valid object type');
        }

        let sql = `SELECT * FROM ${this.table}`;
        let arguments = [];
        let index = 0;
        for (let [key, value] of Object.entries(conditions)) {
            key = '"' + key + '"';
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

    /**
     * find()
     * 
     * Returns the records that matches the specified conditions
     * 
     * @param {object} conditions
     * 
     */
    this.find = function (conditions) {
        if (_.isUndefined(conditions)) {
            throw new Error('Conditions object is undefined');
        }

        if (!_.isObject(conditions)) {
            throw new Error('Conditions are not a valid object type');
        }

        let sql = `SELECT * FROM ${this.table}`;
        let arguments = [];
        let index = 0;
        for (let [key, value] of Object.entries(conditions)) {
            key = '"' + key + '"';
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
                    resolve(rows[0]);
                }
            });
        });
    }

    /**
     * update()
     * 
     * Updates records that matches the specified conditions with given values
     * 
     * @param {object} conditions
     * @param {object} values
     * 
     */
    this.update = function (conditions, values) {

        if (_.isUndefined(conditions)) {
            throw new Error('Conditions are undefined.');
        }
        if (_.isUndefined(values)) {
            throw new Error('Values are undefined.');
        }
        if (_.isEmpty(values)) {
            throw new Error('Empty vvalues are not allowed.');
        }
        if (!_.isObject(conditions) || !_.isObject(values)) {
            throw new Error('Conditions are not passed as object');
        }
        if (!_.isObject(values)) {
            throw new Error('Values are not passed as object');
        }

        if (!_.keys(values) || !_.values(values)) {
            throw new Error('keys or values not passed');
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

    /**
     * delete()
     * 
     * Deletes records that matches the specified conditions
     * 
     * @param {object} conditions
     * 
     */
    this.delete = function (conditions) {

        if (_.isUndefined(conditions) || !_.isObject(conditions)) {
            throw new Error('conditions is not defined or not an object');
        }

        if (_.isEmpty(conditions)) {
            throw new Error('conditions are not passed for deletion');
        }

        let sql = `DELETE FROM ${this.table}`;
        let arguments = [];
        let index = 0;
        for (let [key, value] of Object.entries(conditions)) {
            key = '"' + key + '"';

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

    /**
     * insert()
     * 
     * Inserts a single record in the table
     * 
     * @param {object} data
     * 
     */
    this.insert = function (data) {
        if (_.isUndefined(data) || _.isEmpty(data) || !_.isObject(data)) {
            throw new Error('data is empty,not defined or is not an object');
        }
        if (!_.keys(data) || !_.values(data)) {
            throw new Error('keys or values not passed');
        }
        const keys = Object.keys(data).map((key) => { return '"' + key + '"' });
        const values = Object.values(data);
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

    /**
     * batchInsert()
     * 
     * Inserts a multiple records in the table
     * 
     * @param {object[]} data
     * 
     */
    this.batchInsert = function (data) {
        if (_.isUndefined(data) || _.isEmpty(data) || !_.isObject(data)) {
            throw new Error('data is empty,not defined or is not an object');
        }
        if (!_.keys(data) || !_.values(data)) {
            throw new Error('keys or values not passed');
        }

        const keys = Object.keys(data[0]).map((key) => { return '"' + key + '"' });

        let valuesPlaceHolder = new Array(Object.keys(data[0]).length).fill('?').join();
        let sql = `INSERT INTO ${this.table}("${keys}") VALUES('${valuesPlaceHolder}')`;
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

    /**
     * findOneOrCreate()
     * 
     * Finds and returns the first record using given conditions if record exists
     * If no record found with the given condition it create a new record in table
     * by combining values in condition and values.
     * 
     * @param {object} conditions
     * @param {object} values
     * 
     */
    this.findOneOrCreate = async function (conditions, values) {
        if (_.isUndefined(conditions) || _.isEmpty(conditions) || !_.isObject(values)) {
            throw new Error('conditions is empty, undefined or is not an object');
        }

        if (!_.keys(values) || !_.values(values)) {
            throw new Error('keys or values not passed');
        }

        let result = await this.findOne(conditions);
        if (result) {
            return result;
        }
        else {
            let data = {
                ...conditions,
                ...values
            }
            return this.insert(data);
        }
    }

    /**
     * raw()
     * 
     * Run the give raw query against the table and returns the raw result
     * 
     * @param {string} statement - Raw query
     * 
     */
    this.raw = async function (statement) {
        if (_.isUndefined(statement) || _.isEmpty(statement)) {
            throw new Error('statement is undefined or empty');
        }

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

    /**
     * updateOrCreate()
     * 
     * Updates and returns the records using given conditions if records exists
     * If no record found with the given condition it create a new record in table
     * by combining values in condition and values.
     * 
     * @param {object} conditions
     * @param {object} values
     * 
     */
    this.updateOrCreate = async function (conditions, values) {

        if (_.isUndefined(conditions) || _.isEmpty(values) || !_.isObject(values)) {
            throw new Error('conditions || keys || values is undefined');
        }

        if (!_.keys(values) || !_.values(values)) {
            throw new Error('keys or values not passed');
        }

        let result = await this.update(conditions, values);
        if (result) {
            return result;
        } else {
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