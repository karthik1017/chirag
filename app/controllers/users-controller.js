const express = require('express');
const _ = require('lodash');
const router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../../auth/verify-token');
const { User } = require('../models/user');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../../config/keys'); // get config file

//login
router.post('/login', (req, res) => {
    var body = req.body;
    // console.log(body)
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            var data = {
                success: true,
                message: "Login success",
                token: token,
                user : user
              };
              console.log(data);
              // Adds header
              res.setHeader('x-auth', token);
          
              // responds with status code 200 and data
              res.status(200).json(data);
            //res.header('x-auth', token).send(user)
        })
    }).catch((e) => {
        res.status(400).send()
    })
    // res.send('hello')
})

//new registeration
router.post('/register', (req, res) =>  {
    let body = req.body;
    let user = new User(body);
    user.save().then((user) => {
        console.log('before auth')
        return user.generateAuthToken();
    }).then((token) => {
        console.log(token)
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
});

// get the specific user
router.get('/me', VerifyToken, function (req, res, next) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send({auth : true, user : user});
    });
});

// use for mangeral purpose
// delete a user
router.delete('/:id', (req, res) => {
    let id = req.params.id
    User.findByIdAndRemove(id).then(user => {
        if(user){
            res.send({
                user,
                notice: 'successfully deleted user'
            });
        }
        else {
            res.send(404).send({
                notice: 'the user already removed'
            });
        }
    }).catch(err => {
        res.send(err);
    })
})

// always send header to logout
router.get('/logout', VerifyToken, function (req, res) {
    User.findById(req.userId).then((user) =>{
        let found = user.tokens.find(ele => {return ele.token == token});
        user.tokens.remove(found._id);
        return user.save()
    }).then((user) => {
        res.status(200).send({ auth: false, token: null });
        res.send({notice: 'sucessfully logged out'});
    }).catch((err) => {
        res.send(err);
    });
});

// update a specific user
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    User.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(user => {
            res.send(user)
        }).catch(err => {
            res.send(err);
        })
})

module.exports = {
    userController: router
}