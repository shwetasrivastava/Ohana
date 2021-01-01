var _ = require('underscore');

const {findOne, find, count, sum, raw, max, min, avg, update, insert, destroy, batchinsert ,findOneOrCreate, updateOrCreate} = require('./functions');

const ohana = function (table) {

    if (_.isUndefined(table)) {
        throw new Error('Table name is not defined.');
    } else if (_.isEmpty(table)) {
        throw new Error('Table name is empty.');
    } else {
        this.table = table;
    }

    this.raw = raw;
    this.avg = avg;
    this.max = max;
    this.min = min;
    this.sum = sum;
    this.find = find;
    this.count = count;
    this.update = update;
    this.insert = insert;
    this.destroy = destroy;
    this.findOne = findOne;
    this.batchInsert = batchinsert;
    this.findOneOrCreate = findOneOrCreate;
    this.updateOrCreate = updateOrCreate;
}

module.exports = ohana;