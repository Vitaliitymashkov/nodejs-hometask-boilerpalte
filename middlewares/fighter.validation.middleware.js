const { fighter } = require('../models/fighter');
const fighterService = require('../services/fighterService')

const validateFighter = (request, response, next) => {
    //NAME VALIDATION
    const name = request.body.name;
    if (name != undefined) {
        const nameValidation = fighterService.search((fighter) => {
            return fighter.name.toLowerCase() === name.toLowerCase();
        });

        if (nameValidation) {
            return response.status(400).json({
                error: true,
                message: 'Fighter with this name (case insensitive) is already registered. Your new name was: ' + name
            })
        }
    }
    //DEFENSE VALIDATION
    const defense = request.body.defense;
    if (defense < 1 || defense > 10) {
        return response.status(400).json({
            error: true,
            message: 'Fighter\'s defense should be in range: [1 .. 10]. Please change the value.'
        })
    }

    //POWER VALIDATION
    const power = request.body.power;
    if (power < 1 || power > 100) {
        return response.status(400).json({
            error: true,
            message: 'Fighter\'s power should be in range: [1 .. 100]. Please change the value.'
        })
    }

    //HEALTH VALIDATION
    const health = request.body.health;
    if (health < 80 || health > 120) {
        return response.status(400).json({
            error: true,
            message: 'Fighter\'s health (optional) should be in range: [80 .. 120]. Default = 100. Please change the value.'
        })
    }


    next();
}

const validateFighterForUpdate = (req, res, next) => {
    try {
        let updateModelFieldsName = updateModelFieldsDefense = updateModelFieldsPower = updateModelFieldsHealth = false;

        //DATA PRESENSE VALIDATION
        // try {
        const isIdInRequestBody = req.body.id;
        console.log(`Checking for ID in request body`);
        if (isIdInRequestBody) {
            return res.status(400).json({
                error: true,
                message: `Id is not allowed in request body`
            })
        }

        //NAME VALIDATION
        const name = req.body.name;
        if (name == undefined) {
            updateModelFieldsName = false;
        } else {
            updateModelFieldsName = true;
            const nameValidation = FighterService.search((fighter) => {
                return fighter.name === name;
            });

            if (nameValidation) {
                console.log('Working with the same name');
            }
        }

        //DEFENSE VALIDATION
        const defense = req.body.defense;
        if (defense == undefined) {
            updateModelFieldsDefense = false;
        } else {
            updateModelFieldsDefense = true;

            if (defense < 1 || defense > 10) {
                return response.status(400).json({
                    error: true,
                    message: 'Fighter\'s defense should be in range: [1 .. 10]. Please change the value.'
                })
            }
        }

        //POWER VALIDATION
        const power = req.body.power;
        if (power == undefined) {
            updateModelFieldsPower = false;
        } else {
            updateModelFieldsPower = true;
            if (power < 1 || power > 100) {
                return response.status(400).json({
                    error: true,
                    message: 'Fighter\'s power should be in range: [1 .. 100]. Please change the value.'
                })
            }

        }

        //HEALTH VALIDATION
        const health = req.body.health;
        if (health == undefined) {
            updateModelFieldsHealth = false;
        } else {
            updateModelFieldsHealth = true;
        }

        if ((updateModelFieldsName || updateModelFieldsDefense || updateModelFieldsPower || updateModelFieldsHealth) == false) {
            throw new Error('There are no fields in request. Please submit at least one valid field.');
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: 'Error: ' + error.message
        })
    }
    next()
}

exports.validateFighter = validateFighter;
exports.validateFighterForUpdate = validateFighterForUpdate;
