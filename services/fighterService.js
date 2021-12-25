const { fighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO+: Implement methods to work with fighters

    getFighter(request, response) {
        const fighters = fighterRepository.getAll();
        response.send(fighters);
    }

    createFighter(request, response) {
        const newFighter = fighterRepository.create(request.body);
        response.send(newFighter);
    }

    updateFighter(request, response) {
        const updatedFighter = fighterRepository.updateFighter(request.params.id, request.body);
        response.send(updatedFighter);
    }

    search(search) {
        const item = fighterRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    searchById(search) {
        const item = fighterRepository.getOneById(search);
        if (!item) {
            return null;
        }
        return item;
    }

    delete(id) {
        return fighterRepository.delete(id);
    }
}

module.exports = new FighterService();
