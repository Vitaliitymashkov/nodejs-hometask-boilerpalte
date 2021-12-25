const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, validateUserForUpdate: validateUserForUpdate, validateUser: validateUser } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO+: Implement route controllers for user

router.post('/', validateUser, UserService.createUser);

router.put('/:id', validateUserForUpdate, UserService.updateUser);

router.get('/', UserService.getUser);

router.delete('/:id', (request, response) => {
    try {
        const result = UserService.delete(request.params.id);
        if (result.length > 0) {
            response.send(result);
        } else {
            const id = request.params.id;
            const errorMessage = `User ${id} not found - cannot delete it.`; //reflected xss - need to escape id
            console.log(errorMessage);
            return response.status(404).json({
                error: true,
                message: errorMessage
            })
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: true,
            message: error
        })
    }
});

router.get('/:id', (request, response) => {
    try {
        const result = UserService.searchById(request.params.id);
        if (result) {
            response.send(result);
        } else {
            const id = request.params.id;
            const errorMessage = `User ${id} not found - cannot get it.`; //reflected xss - need to escape id
            console.log(errorMessage);
            return response.status(404).json({
                error: true,
                message: errorMessage
            })
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: true,
            message: error
        })
    }
});

module.exports = router;
