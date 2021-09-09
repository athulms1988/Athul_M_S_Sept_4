const express = require('express')
const app = express.Router();
const CONFIG = require('../config')
const uuid = require('uuid-by-string');
const jwt = require('jsonwebtoken');
const { validationResult, check } = require('express-validator')
const TOKEN_SECRET = CONFIG.JWT_TOKEN_SECRET;
const bcrypt = require('bcryptjs');
const userModel = require('../model/user');

//Register a new user
app.post('/register', [
    check('name').isLength({ min: 4 }),
    check('email').isEmail(),
    check('password').isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let user = await userModel.find({ email: req.body.email });

    if (user && user.length > 0) {
        res.status(400).json({ "message": "User with same email address exists" });
    } else {
        bcrypt.genSalt(CONFIG.SALT_ROUNDS, function (err, salt) {
            if (err) {
                res.status(400).json({ "message": "Error occurred while creating a user, Please try again" })
            } else {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    if (err) {
                       res.status(400).json({ "message": "Error occurred while creating a user, Please try again" }) 
                    } else {
                        req.body.password = hash;
                        console.log(req.body)
                        let userData = new userModel(req.body);
                        let savedUser = await userData.save();
                        res.json({ "message": "Account created successfully, Please login" })
                    }
                })
            }
        });
    }
});

//Login
app.post('/login', [
    check('email').notEmpty(),
    check('password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let userdata = await userModel.find({ email: req.body.email });
    if(userdata && userdata[0]) {
        const passwordMatch = await bcrypt.compare(req.body.password, userdata[0].password);
        if (passwordMatch) {           
            jwt.sign({
                id: userdata[0]._id,
                name: userdata[0].name,
                email: userdata[0].email,
                phone: userdata[0].phone,
                role: userdata[0].role
            },
                TOKEN_SECRET,
                { algorithm: CONFIG.JWT_TOKEN_ALGORITHM },
                function (err, _token) {
                    if (err) {
                        res.status(401).json({ message: 'Invalid User Name or Password' });
                    } else {
                        res.json({
                            message: 'Login Successful',
                            token: _token,
                            name: userdata[0].name,
                            email: userdata[0].email
                        })
                    }
                }
            )
                
        } else {
            res.status(400).json({"message": "Email or Password is invalid"});
        }
    } else {
        res.status(400).json({"message": "Email or Password is invalid"});
    }
});



module.exports = app