const User = require('../../db/User'),
bcrypt = require('bcrypt');
path = require('path');

module.exports = {

    create: (req, res) => {

        

        if (req.body.passwordVerif !== req.body.password) {
            console.log('error password')
            res.render('index')
        } else {

            User.create({
                pseaudo: req.body.pseaudo,
                email: req.body.email,
                passwordVerif: req.body.passwordVerif

            }, (error, user) => {

                if (error) {
                    res.redirect('/')
                } else {
                    console.log('Success Create')
                    res.redirect('/')
                }
            })


        }





        res.render('index')
    }



}