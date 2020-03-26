const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const express = require('express')
const router = express.Router()

// User model
const User = require('../../models/User')

router.post('/', (req, res) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.json({success : false, msg : 'Please enter all the data'})
    }

    User
      .findOne({ email })
      .then(user => {
         if(user){
            return res.json({success : false, msg : 'User already exits'})
         }

         const newUser = new User({
             name, email, password
         })

         bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
 
                newUser.save()
                       .then(user => {
                           jwt.sign(
                               {id : user.id},
                               config.get('jwtSecret'),
                               { expiresIn : 3600 },
                               (err, token) => {
                                if(err) throw err;
                                res.json({
                                       success :true,
                                       msg : "Profile Created",
                                       token,
                                       user : {
                                           id : user.id,
                                           name : user.name,
                                           email : user.email
                                       }
                                   })
                               }
                           )
                       })
            })
         })

      })
})

module.exports = router