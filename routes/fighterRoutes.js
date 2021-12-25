const { Router } = require('express');
const fighterService = require('../services/fighterService');
const { createFighter, getFighter, updateFighter } = require('../services/fighterService');

const { responseMiddleware } = require('../middlewares/response.middleware');
// const { createFighterValid, validateFighter2: validateFighter, updateFighterValid } = require('../middlewares/fighter.validation.middleware');
const { validateFighter: validateFighter, validateFighterForUpdate : validateFighterForUpdate  } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO+: Implement route controllers for fighter

//DONE
router.post('/', validateFighter, createFighter);
// (req, res, next) => {
//     try {
//         const result = createFighterValid(req, res, next);
//         res.send(result);
//     } catch (err) {
//         res.err = err;
//         console.log(err);
//     } finally {
//         next();
//     }
// });

//DONE - to delete
// router.post('/create2', validateFighter, createFighter);

router.put('/:id', validateFighterForUpdate, fighterService.updateFighter);

router.get('/', getFighter);
// (req, res, next) => {
//     try {
//         const result = fighterService.search('fighters');
//         res.send(result);
//     } catch (err) {
//         res.err = err;
//         console.log(err);
//     } finally {
//         next();
//     }
// }, responseMiddleware);

// router.delete('/:id', (req, res, next) => {
//     try {
//         const result = fighterService.delete(req.id);
//         res.send(result);
//     } catch (err) {
//         res.err = err;
//         console.log(err);
//     } finally {
//         next();
//     }
// }, responseMiddleware);

// router.get('/:id', (req, res, next) => {
//     try {
//         const result = fighterService.search(req.id);
//         res.send(result);
//     } catch (err) {
//         res.err = err;
//         console.log(err);
//     } finally {
//         next();
//     }
// }, responseMiddleware);





//DONE
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

//DONE
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