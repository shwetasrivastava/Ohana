    var _ = require('underscore');
    /**
     * 
     * finds and returns the first record using given conditions if record exists
     * if no record found with the given condition it creates a new record in table
     * by combining values in condition and values.
     * 
     * @param {object} conditions
     * @param {object} values
     * 
     */
     module.exports = async function findOneOrCreate (conditions, values) {
        if (_.isUndefined(conditions) || _.isEmpty(conditions) || !_.isObject(values)) {
            throw 'conditions is empty, undefined or is not an object';
        }

        if (!_.keys(values) || !_.values(values)) {
            throw 'keys or values not passed';
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
