const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {

    const { email, password, token } = req.body;

    if(token){

        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.user = decoded;

            User.findById(req.user.id)
                .then(user => {
                    jwt.sign(
                        {id : user.id}, config.get('jwtSecret'), {expiresIn : 3600}, (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                msg : 'Profile authenticated successfully',
                                user : {
                                    id : user.id,
                                    name : user.name,
                                    email : user.email
                                },
                                success : true
                            })

                        }
                    )
                })
                .catch(err => {
                    return res.json({'msg' : 'User not found', success : false})
                })
        }

        catch (e) {
            return res.json({msg : 'Token not valid', success : false})
        }
    } else {

    // Simple validation
    if(!email || !password){
        return res.json({msg : 'Please enter all fields', success : false})
    }

    // Check user
    User.findOne({ email })
        .then(user => {
            if(!user){
                return res.json({msg : 'User Does not exist', success : false})
            }

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch){
                        return res.json({msg : 'Invalid Credentials', success : false})
                    }

                    jwt.sign(
                        {id : user.id},
                        config.get('jwtSecret'),
                        { expiresIn : 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                success : true,
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
    }
})

module.exports = router;