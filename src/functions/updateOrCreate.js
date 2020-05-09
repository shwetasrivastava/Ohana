     /**
     * 
     * Updates and returns the records using given conditions if records exists
     * If no record found with the given condition it create a new record in table
     * by combining values in condition and values.
     * 
     * @param {object} conditions
     * @param {object} values
     * 
     */
     module.exports = async function updateOrCreate(conditions, values) {

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