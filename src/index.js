const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;  //for heroku hosting

// setting up middleware
//
// app.use((req, res, next) =>{
//     console.log(req.method, req.path); // gives the method used for making the request & the path/route for the request!
//     next();                             // next() is called for terminating the infinitely running request!
// });



app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () =>{
    console.log('Server is set up :')
});