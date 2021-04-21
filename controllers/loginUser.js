const bcrypt = require('bcrypt');

const User = require('../database/models/User')
console.log('user', User)
module.exports = (req, res) => {
    const {email, password} = req.body;
   
        // try to find user by
    User.findOne({email}, (error, user) => {
        if (user) {
            

            //compare user passwords         
           bcrypt.compare(password, user.password, (error, same) => {
            if (same) {
                req.session.userId = user._id
                console.log('b',req.session.userId)
                res.redirect('/')
            } else {
                
                res.redirect('/auth/login')
             }
         })
        } else {
            return res.redirect('/auth/login')
        }
   })
}