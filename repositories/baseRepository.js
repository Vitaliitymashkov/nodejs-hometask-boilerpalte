const { dbAdapter } = require('../config/db');
const { v4 } = require('uuid');


class BaseRepository {
    constructor(collectionName) {
        this.dbContext = dbAdapter.get(collectionName);
        this.collectionName = collectionName;
    }

    generateId() {
        return v4();
    }

    getAll() {
        return this.dbContext.value();
    }

    getOne(search) {
        return this.dbContext.find(search).value();
    }

    getOneById(search) {
        return this.dbContext.find(element => element.id === search).value();
    }

    create(data) {
        data.id = this.generateId();
        if (data.health == undefined) {
            data.health = 100;
        }
        // data.createdAt = new Date();
        const list = this.dbContext.push(data).write();
        return list.find(it => it.id === data.id);
    }

    update(id, dataToUpdate) {
        // dataToUpdate.updatedAt = new Date();
        return this.dbContext.find({ id }).assign(dataToUpdate).write();
    }

    updateUser(id, dataToUpdate) {
        // dataToUpdate.updatedAt = new Date();
        return this.dbContext.find({ id }).assign(dataToUpdate).write();
    }

    updateFighter(id, dataToUpdate) {
        // dataToUpdate.updatedAt = new Date();
        return this.dbContext.find({ id }).assign(dataToUpdate).write();
    }

    delete(id) {
        return this.dbContext.remove(element => element.id === id).write();
    }
}

exports.BaseRepository = BaseRepository;
