const { Router } = require('express');
const fighterService = require('../services/fighterService');
const { createFighter, getFighter, updateFighter } = require('../services/fighterService');

const { responseMiddleware } = require('../middlewares/response.middleware');
const { validateFighter: validateFighter, validateFighterForUpdate: validateFighterForUpdate } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO+: Implement route controllers for fighter

router.post('/', validateFighter, createFighter);

router.put('/:id', validateFighterForUpdate, fighterService.updateFighter);

router.get('/', getFighter);
router.delete('/:id', (request, response) => {
    try {
        const result = fighterService.delete(request.params.id);
        if (result.length > 0) {
            response.send(result);
        } else {
            const id = request.params.id;
            const errorMessage = `Fighter ${id} not found - cannot delete it.`; //reflected xss - need to escape id
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
        const result = fighterService.searchById(request.params.id);
        if (result) {
            response.send(result);
        } else {
            const id = request.params.id;
            const errorMessage = `Fighter ${id} not found - cannot get it.`; //reflected xss - need to escape id
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
