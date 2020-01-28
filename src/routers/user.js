const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() =>{
        res.send(user)
    }).catch((e) =>{
        res.status(400).send(e)
    })
});

router.get('/users', (req, res) =>{
    User.find({}).then((users) =>{
        res.send(users)
    }).catch((e) =>{
        res.status(500).send(e)
    })
});

router.get('/users/:id', (req, res) =>{
    const _id = req.params.id;
    User.findById(_id).then((user) =>{
        if(!user){
            return res.status(500).send()
        }
        res.send(user)
    }).catch((e) =>{
        res.status(500).send()
    })
});

router.patch('/users/:id', async (req, res) =>{
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'});
    }
    try{
        const user = await User.findByIdAndUpdate(_id, req.body,{
                new: true,   // gives us back the new user after update applied in res,send()
                runValidators: true
            }
        );
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) =>{
    const _id = req.params.id;
    try{
        const user =await User.findByIdAndDelete(_id );
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;
