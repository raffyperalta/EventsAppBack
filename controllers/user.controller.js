const models = require ('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = models.User



const register = async(req,res) =>{
  const data = req.body;
  try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    await User.create(
      data
    );
    res.status(201);
    res.json({
      'message': 'Registration Successful'
    });

  }catch(err){
    console.log(err)
  }
}

const getUsers = async (req,res) => {
  try{
    const data = await User.findAll();
    res.json(data);
  }catch(err){
    console.log(err)
  }
}

const getOneUser = async (req, res)=>{
  const data = await connection.User.findOne({where: {id:req.user.id}});
  res.json(data);
}


const login = async(req,res) =>{
  // const data = req.body;
  // data.password = hash;
  
  const email = req.body.email;
  const password = req.body.password;
  
  try{
    const user = await User.findOne({
      where:{ email : email }
    });
    console.log("this is user: " +user)
    const checkPassword = bcrypt.compare(password, user.password);
    if(!checkPassword){
      return res.json("password incorrect");
    }else{
      const payload = {
        id:user.id,
      }
      const token = jwt.sign(payload, 'myVerySecret');
      res.json({
        'token' : token,
        'msg' : 'login successful',
        'user' : user,
        'statusCode' : 200
      });
    }
  }catch(err){
    res.json({
      'message': 'Wrong email or password'
    })
  }
}





module.exports = {
  register, login, getUsers, getOneUser
}