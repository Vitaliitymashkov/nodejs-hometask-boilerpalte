const { fighter } = require('../models/fighter');
const fighterService = require('../services/fighterService')

const validateFighter = (request, response, next) => {
    //NAME VALIDATION
    const name = request.body.name;
    const nameValidation = fighterService.search((fighter) => {
        return fighter.name.toLowerCase() === name.toLowerCase();
    });
    if (nameValidation) {
        return response.status(400).json({
            error: true,
            message: 'Fighter with this name (case insensitive) is already registered. Your new name was: ' + name 
        })
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

//TO DELETE
// const createFighterValid = (req, res, next) => {
//     // TODO+: Implement validatior for fighter entity during creation
//     try {
//         //DATA EXISTANCE VALIDATION
//         const missingFieldValidation = fields.find((item) => {
//             return req.body[item] == null || req.body[item] == '' || req.body[item] == undefined

//         });
//         if (missingFieldValidation) {
//             return res.status(400).json({
//                 error: true,
//                 message: `Please enter your ${missingFieldValidation}`
//             })
//         };
//         //NAME VALIDATION
//         const name = req.body.name;
//         const namelValidation = fighterService.search((fighter) => {
//             return fighter.name === name;
//         });
//         if (namelValidation) {
//             return res.status(400).json({
//                 error: true,
//                 message: 'Fighter with this name is already registered'
//             })
//         }
//         //DEFENSE VALIDATION
//         const defense = req.body.defense;
//         if (defense >= 10 || defense <= 1) {
//             return res.status(400).json({
//                 error: true,
//                 message: `Defense should be from 1 to 10`
//             })
//         };
//         //POWER VALIDATION
//         const power = req.body.power;
//         if (power >= 100 || power <= 1) {
//             return res.status(400).json({
//                 error: true,
//                 message: `Power should be from 1 to 100`
//             })
//         }

//         const newFighter = fighterService.createFighter(req.body);
//         res.send(newFighter);
//         next();

//     } catch (err) {

//     }
//     next();
// }

// const updateFighterValid = (req, res, next) => {
//     // TODO: Implement validatior for fighter entity during update
//     next();
// }



const validateFighterForUpdate = (req, res, next) => {
    try {
        // const id = req.params.id;
        let updateModelFieldsName = updateModelFieldsDefense = updateModelFieldsPower = updateModelFieldsHealth = false;

        //DATA EXISTANCE VALIDATION
        // try {
            const isIdInRequestBody = req.body.id;
            console.log(`Checking for ID in request body`);
            if (isIdInRequestBody) {
                return res.status(400).json({
                    error: true,
                    message: `Id is not allowed in request body`
                })
            }
        // } catch (error) {
        //     //Can procees as there is no ID
        //     console.log(error);
        // }



        // const missingFieldValidation = userModelfields.find((item) => {
        //     return req.body[item] == null || req.body[item] == '' || req.body[item] == undefined

        // });
        // if (missingFieldValidation) {
        //     return res.status(400).json({
        //         error: true,
        //         message: `Please enter your ${missingFieldValidation}`
        //     })
        // }

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
            // return res.status(400).json({
            //     error: true,
            //     message: 'User with this email address is already registered. Please use unique email.'
            // })
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

     

        if ((updateModelFieldsName || updateModelFieldsDefense || updateModelFieldsPower || updateModelFieldsHealth ) == false) {
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

// exports.createFighterValid = createFighterValid;
exports.validateFighter = validateFighter;
// exports.updateFighterValid = updateFighterValid;
exports.validateFighterForUpdate = validateFighterForUpdate;