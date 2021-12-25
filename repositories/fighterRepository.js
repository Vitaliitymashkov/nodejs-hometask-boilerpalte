const { BaseRepository } = require('./baseRepository');

class FighterRepository extends BaseRepository {
    constructor() {
        super('fighters');
    }
}

exports.fighterRepository = new FighterRepository();
