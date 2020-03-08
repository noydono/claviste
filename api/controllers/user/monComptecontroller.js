// req.flash ne marche pas fair la gestion d'err plus tard


const User = require('../../db/User'),
    bcrypt = require('bcrypt'),
    path = require('path'),
    fs = require('fs')

module.exports = {


        update: async (req, res) => {

            console.log('update article');

            const dbUser = await User.findById(req.session.userId),
                pathImg = path.resolve('public/uploads/' + dbUser.avatarName)

            console.log(dbUser);
            

            if (req.body.password !== req.body.passwordVerif) {

                console.log('error password')

                req.flash('registerPwdErr', 'vaut deux mpd ne sont pas les mếme')
                res.render('index')

            } else {

                console.log('password OK')
                if (!req.file) {

                    User.findByIdAndUpdate(req.session.userId, {

                        username: req.body.username,
                        email: req.body.email,
                        passwordVerif: req.body.passwordVerif

                    }, (err, post) => {

                        if (err) {
                            console.log('article nest pas post ' + err);

                        } else {
                            console.log('article crée');

                            res.redirect('back')
                        }
                    })

                } else {

                    fs.unlink(pathImg,
                        (err) => {
                            if (err) {
                                console.log(err)
                            } else {

                                console.log('File Deleted.')

                                User.findByIdAndUpdate(req.session.userId, {

                                    username: req.body.username,
                                    email: req.body.email,
                                    passwordVerif: req.body.passwordVerif,
                                    img: `/public/uploads/${req.file.filename}`,
                                    nameImg: req.file.filename


                                }, (err, post) => {

                                    if (err) {
                                        console.log('article nest pas post ' + err);

                                    } else {
                                        console.log('article crée');

                                        res.redirect('back')
                                    }
                                })
                            }

                        })
                }
            }

        }
    
    }