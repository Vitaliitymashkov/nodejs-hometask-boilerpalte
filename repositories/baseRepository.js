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

    //DOME
    getAll() {
        return this.dbContext.value();
    }

    //DONE
    getOne(search) {
        // return this.dbContext.find(element => element.id === search).value();
        return this.dbContext.find(search).value();
    }

    // getOneFighter(search) {
    //     return this.dbContext.find(element => element.name.toLowerCase() === search.name.toLowerCase()).value();
    //     // return this.dbContext.find(search).value();
    // }

    //DONE
    getOneById(search) {
        return this.dbContext.find(element => element.id === search).value();
        // return this.dbContext.find(search).value();
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