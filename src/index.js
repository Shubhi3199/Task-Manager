const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;  //for heroku hosting

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () =>{
    console.log('Server is set up :')
});