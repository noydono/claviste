const User = require('../../db/User')

module.exports = {

    create: async (req, res) => {

        console.log(req.body);
        const mail = await User.find({
            email: req.body.email
        })

        if (mail) {

            res.render('index')
            console.log('mail exixten dans la db');
            
        } else {
            
            if (req.body.password !== req.body.passwordVerif) {
                console.log('error password')
                res.render('index')

            } else {
                console.log('password OK')

                User.create({

                    username: req.body.username,
                    email: req.body.email,
                    passwordVerif: req.body.passwordVerif

                }, (err, user) => {

                    if (err) {
                        console.log(err);

                        res.redirect('/')

                    } else {

                        console.log('Success Create')
                        res.redirect('/')

                    }
                })


            }

        }
    }



}