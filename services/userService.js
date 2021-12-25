const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO+: Implement methods to work with user

    createUser(data) {
        return UserRepository.create(data);
    }

    updateUser(request, response) {
        const updatedUser = UserRepository.updateUser(request.params.id, request.body);
        response.send(updatedUser);
    }

    createUser(request, response) {
        const newUser = UserRepository.create(request.body);
        response.send(newUser);
    }

    getUser(request, response) {
        const users = UserRepository.getAll();
        response.send(users);
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    searchById(search) {
        const item = UserRepository.getOneById(search);
        if (!item) {
            return null;
        }
        return item;
    }

    delete(id) {
        const item = UserRepository.delete(id);
        if (!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();
