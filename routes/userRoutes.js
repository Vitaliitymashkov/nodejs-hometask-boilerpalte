const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, validateUserForUpdate: validateUserForUpdate, validateUser: validateUser } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO+: Implement route controllers for user

// router.post('/', (req, res, next) => {
//     try {
//         return createUserValid(req, res, next);
//     } catch (err) {
//         res.err = err;
//     } finally {
//         next();
//     }
// }, responseMiddleware);

//DONE
router.post('/', validateUser, UserService.createUser);

router.put('/:id', validateUserForUpdate, UserService.updateUser);

// router.post('/create2', validateUser2, UserService.createUser2);

// router.get('/get2', UserService.getUser2);
//DONE
router.get('/', UserService.getUser);



//TO DELETE
// router.get('/', (req, res, next) => {
//     try {
//         const result = UserService.search('fighters');
//         res.send(result);
//     } catch (err) {
//         res.err = err;
//         console.log(err);
//     } finally {
//         next();
//     }
// }, responseMiddleware);

//TO DELETE
// router.delete('/:id', (req, res, next) => {
//     try {
//         const result = UserService.delete(req.id);
//         res.send(result);
//     } catch (err) {
//         res.err = err;
//         console.log(err);
//     } finally {
//         next();
//     }
// }, responseMiddleware);

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

//DONE
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

//TO DELETE
// router.get('/:id', (req, res, next) => {
//     try {
//         const result = UserService.search(req.id);
//         res.send(result);
//     } catch (err) {
//         res.err = err;
//         console.log(err);
//     } finally {
//         next();
//     }
// }, responseMiddleware);

module.exports = router;