const User = require('../../db/User'),
    bcrypt = require('bcrypt'),
    path = require('path'),
    fs = require('fs'),    
    nodemailer = require('nodemailer')
module.exports = {

    
    verifMail: async (req, res) => {

        const userID = await User.findOne({ email: mailOptions.to }),
            query = { _id: userID._id }
       
        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {


            console.log("Domain is matched. Information is from Authentic email")

            if (req.params.id == mailOptions.rand) {

                console.log("email is verified")
                // res.end("<h1>Email " + mailOptions.to + " is been Successfully verified")

                User.findByIdAndUpdate(userID._id, {

                    isVerified: true,

                }, (err, user) => {

                    if (err) {

                        console.log(err);
                        res.redirect('/')

                    } else {

                        console.log(user);
                        console.log('pwd same ');
                        req.session.userId = user._id
                        req.session.username = user.username,
                        req.session.email = user.email,
                        req.session.isAdmin = user.isAdmin,
                        req.session.isVerified = true,
                        req.session.isBan = user.isBan,
                        req.session.status = user.status,
                        req.session.avatarImg = user.avatarImg
                        req.flash('verifOk','.')
                        res.redirect('/')

                    }
                })

            } else {

                console.log("email is not verified")
                res.redirect("/")

            }

        } else {
            res.end("<h1> source inconuue</h1>")
        }

    }

}