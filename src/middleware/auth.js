const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) =>{
  try{
      const token = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = jwt.verify(token, 'nodejscourse');
       // console.log(decodedToken);
      next();
  }catch (e) {
      res.status(401).send({ error: 'Please Authenticate!'});
  }
};

module.exports = auth;