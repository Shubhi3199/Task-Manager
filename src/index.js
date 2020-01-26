const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;  //for heroku hosting

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() =>{
        res.send(user)
    }).catch((e) =>{
        res.status(400).send(e)
    })
});

app.get('/users', (req, res) =>{
    User.find({}).then((users) =>{
        res.send(users)
    }).catch((e) =>{
        res.status(500).send(e)
    })
});

app.get('/users/:id', (req, res) =>{
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

app.post('/tasks', async (req, res) => {
        const task = new Task(req.body);

        try{
            await task.save();
            res.status(201).send(task)
        }catch (e) {
            res.status(400).send(e)
        }

    }
);

app.get('/tasks', async (req, res) =>{

    try{
        const tasks = await Task.find({});
        res.send(tasks)
    }catch (e) {
        res.status(500).send(e)
    }

});

app.get('/tasks/:id',async (req, res) =>{
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        res.send(task);
    }catch (e) {
        res.status(500).send(e)
    }
});

app.patch('/users/:id', async (req, res) =>{
   const _id = req.params.id;
   try{
       const user = await User.findByIdAndUpdate(_id, req.body,{
           new: true,   // gives us back the new user after update applied
           runValidators: true
           } ,{
           name: 'GoogleGuy'
           }
       );
       res.send(user)
   }catch (e) {
       res.status(500).send(e);
   }
});

app.listen(port, () =>{
    console.log('Server is set up :')
});