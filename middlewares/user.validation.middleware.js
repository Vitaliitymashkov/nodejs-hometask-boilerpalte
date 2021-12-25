const UserService = require('../services/userService');
const { user } = require('../models/user');
const userModelfields = ['email', 'firstName', 'lastName', 'password', 'phoneNumber'];

const validateUser = (req, res, next) => {
    try {
        //DATA PRESENCE VALIDATION

        const isIdInRequestBody = req.body.id;
        console.log(`Checking for an ID in request body`);
        if (isIdInRequestBody) {
            return res.status(400).json({
                error: true,
                message: `Id is not allowed in request body`
            })
        }

        const missingFieldValidation = userModelfields.find((item) => {
            return req.body[item] == null || req.body[item] == '' || req.body[item] == undefined

        });
        if (missingFieldValidation) {
            return res.status(400).json({
                error: true,
                message: `Please enter your ${missingFieldValidation}`
            })
        }

        //EMAIL VALIDATION
        const email = req.body.email;
        const emailValidation = UserService.search((user) => {
            return user.email === email;
        });

        if (emailValidation) {
            return res.status(400).json({
                error: true,
                message: 'User with this email address is already registered. Please use unique email.'
            })
        }
        if (!email.endsWith('@gmail.com')) {
            return res.status(400).json({
                error: true,
                message: 'Use only Gmail email address'
            })
        }

        //PHONE NUMBER VALIDATION
        const phoneNumber = req.body.phoneNumber;
        const nums = phoneNumber.slice(4);

        const phoneNumberValidation = UserService.search((user) => {
            return user.phoneNumber === phoneNumber;
        });

        if (phoneNumberValidation) {
            return res.status(400).json({
                error: true,
                message: 'User with this phone number is already registered. Please use unique phone.'
            })
        }

        if (phoneNumber.length !== 13 || !phoneNumber.startsWith('+380') || !Number.isInteger(+nums)) {

            return res.status(400).json({
                error: true,
                message: 'Enter your phone number in format: +380xxxxxxxxx'
            })
        }

        //PASSWORD VALIDATION
        const password = req.body.password;
        if (password.length < 3) {
            return res.status(400).json({
                error: true,
                message: 'Password should be at least 3 characters long'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: 'Error ' + error
        })
    }
    next()
}

const validateUserForUpdate = (req, res, next) => {
    try {
        const id = req.params.id;
        let updateModelFieldsEmail = updateModelFieldsFirstName = updateModelFieldsLastName = updateModelFieldsPassword = updateModelFieldsPhoneNumber = false;

        //DATA PRESENCE VALIDATION
        const isIdInRequestBody = req.body.id;
        console.log(`Checking for ID in request body`);
        if (isIdInRequestBody) {
            return res.status(400).json({
                error: true,
                message: `Id is not allowed in request body`
            })
        }

        //EMAIL VALIDATION
        const email = req.body.email;
        if (email == undefined) {
            updateModelFieldsEmail = false;
        } else {
            updateModelFieldsEmail = true;
            const emailValidation = UserService.search((user) => {
                return user.email === email;
            });

            if (emailValidation) {
                console.log('Working with the same email');
            }
            if (!email.endsWith('@gmail.com')) {
                return res.status(400).json({
                    error: true,
                    message: 'Use only Gmail email address'
                })
            }
        }


        //PHONE NUMBER VALIDATION
        const phoneNumber = req.body.phoneNumber;
        const nums = phoneNumber.slice(4);
        if (phoneNumber == undefined) {
            updateModelFieldsPhoneNumber = false;
        } else {
            updateModelFieldsPhoneNumber = true;
            const phoneNumberValidation = UserService.search((user) => {
                return user.phoneNumber === phoneNumber;
            });

            if (phoneNumberValidation) {
                console.log('Working with the same phone number');
            }


            if (phoneNumber.length !== 13 || !phoneNumber.startsWith('+380') || !Number.isInteger(+nums)) {

                return res.status(400).json({
                    error: true,
                    message: 'Enter your phone number in format: +380xxxxxxxxx'
                })
            }
        }

        //PASSWORD VALIDATION

        const password = req.body.password;
        if (password == undefined) {
            updateModelFieldsPassword = false;
        } else {
            updateModelFieldsPassword = true;

            if (password.length < 3) {
                return res.status(400).json({
                    error: true,
                    message: 'Password should be at least 3 characters long'
                })
            }
        }

        //FIRSTNAME VALIDATION
        const firstName = req.body.firstName;
        if (firstName == undefined) {
            updateModelFieldsFirstName = false;
        } else {
            updateModelFieldsFirstName = true;
        }

        //LASTNAME VALIDATION
        const lastName = req.body.lastName;
        if (lastName == undefined) {
            updateModelFieldsLastName = false;
        } else {
            updateModelFieldsLastName = true;
        }

        if ((updateModelFieldsEmail || updateModelFieldsFirstName || updateModelFieldsLastName || updateModelFieldsPassword || updateModelFieldsPhoneNumber) == false) {
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

exports.validateUser = validateUser;
exports.validateUserForUpdate = validateUserForUpdate;
