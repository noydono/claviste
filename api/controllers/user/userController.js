// req.flash ne marche pas fair la gestion d'err plus tard


const User = require('../../db/User'),
    bcrypt = require('bcrypt');

module.exports = {

    create: async (req, res) => {


        const mail = await User.findOne({ email: req.body.email })

        if (!mail) {

            console.log('1');

            if (req.body.password !== req.body.passwordVerif) {
                console.log('error password')
                req.flash('registerPwdErr', 'vaut deux mpd ne sont pas les mếme')
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
        } else {

            res.redirect('/')
            console.log('mail existant dans la db');
            req.flash('emailNotUnique', 'l\'email est deja utiliser')

        }
    },
    login: async (req, res) => {



        const dbUser = ({ username: req.body.username })


        User.findOne(dbUser, (err, user) => {


            if (user) {

                bcrypt.compare(req.body.passwordVerif, user.passwordVerif, function (err, same) {

                    if (same) {
                        console.log('pwd same ');
                        req.session.userId = user._id
                        req.session.username = user.username,
                            req.session.email = user.email,
                            req.session.isAdmin = user.isAdmin,
                            req.session.isVerified = user.isVerified,
                            req.session.isBan = user.isBan,
                            req.session.status = user.status

                        res.redirect('/')

                    } else {

                        console.log('mauvais mot de passe ');
                        req.flash('passwordNotSame', 'votre mot de passe ou votre pseaudo ne sont pas valide')
                        res.redirect('back')

                    }

                });

            } else {

                console.log('pas existant dans la db');

            }



        })




    },
    logout: (req, res) => {
        console.log('coucou');

        req.session.destroy(() => {
            res.clearCookie("biscuit");
            res.redirect('/')
        })

    },
    update: async (req, res) => {

        const query = await User.find({

            _id: req.params.id
        })

        User.findByIdAndUpdate(query, {
            status: req.body.status,
            isAdmin: req.body.isAdmin,
            isVerified: req.body.isVerified,
            isBan: req.body.isBan,
        },
            (err, post) => {
                if (err) {
                    console.log(err);

                    res.redirect('/')
                } else {
                    console.log('update ');

                    res.redirect('/admin')


                }
            })
    }



}