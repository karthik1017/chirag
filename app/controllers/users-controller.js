const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { User } =  require('../models/user');

// get all the users
router.get('/', (req, res) => {
    User.find().then(user => {
        res.send(user);
    })
    .catch(err => {
        res.send(err);
    })
});

// use this route admin purpose not authenticated
// get the specific user
router.get('/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id).then(user => {
        res.send(user)
    })
    .catch(err => {
        res.send(err);
    })
});

// use this route admin purpose not authenticated
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

// create a user or register will generate JWT
router.post('/', (req, res) => {
     let body = req.body;
     let user = new User(body);
     user.save().then((user) => {
         res.send(user);
     }).catch((e) => {
         res.status(400).send(e)
     })
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

