// req.flash ne marche pas fair la gestion d'err plus tard


const User = require('../../db/User'),
    bcrypt = require('bcrypt'),
    path = require('path'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    transporter = require('../../../config/nodemailer-config')

var rand, mailOptions, host, link;

module.exports = {

    create: async (req, res) => {

        console.log('create');

        const mail = await User.findOne({
            email: req.body.email
        })

        if (!mail) {


            if (req.body.password !== req.body.passwordVerif) {

                console.log('error password')
                req.flash('registerPwdErr', 'vaut deux mpd ne sont pas les mếme')
                res.render('index')

            } else {
                console.log('password OK')

                User.create({

                    username: req.body.username,
                    email: req.body.email,
                    passwordVerif: req.body.passwordVerif,
                    avatarImg: `/public/uploads/${req.file.filename}`,
                    avatarName: req.file.filename


                }, (err, user) => {

                    if (err) {

                        console.log(err);
                        res.redirect('/')

                    } else {

                        const rand = Math.floor((Math.random() * 100) + 54),
                            host = req.get('host'),
                            link = "http://" + req.get('host') + "/verify/" + rand,

                            mailOptions = {
                                from: 'noytest.test@gmail.com',
                                to: req.body.email,
                                subject: "The Clavist Email de Verification",
                                rand: rand,
                                html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
                            }

                        console.log(mailOptions)

                        transporter.sendMail(mailOptions, (err, res, next) => {
                            if (err) {
                                console.log(err)
                                res.end("error")
                            } else {
                                console.log("Message Envoyer")
                                res.render('index')
                            }
                        })
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


        console.log('dans le login ');

        const dbUser = ({
            username: req.body.username
        })


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
                            req.session.status = user.status,
                            req.session.avatar = user.avatarImg

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
    },
    verifMail: async (req, res) => {

        // console.log(req.protocol + "://" + req.get('host'))
        // console.log('Page verif ' + mailOptions.to)

        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {

            const dbUser = ({
                username: req.body.username
            })
            console.log("Domain is matched. Information is from Authentic email")

            if (req.params.id == mailOptions) {

                console.log("email is verified")
                res.end("<h1>Email " + mailOptions.to + " is been Successfully verified")

                console.log('dans le login verif');



                User.findOne(dbUser, (err, user) => {

                    if (user) {

                        console.log('pwd same ');

                        req.session.userId = user._id
                        req.session.username = user.username,
                            req.session.email = user.email,
                            req.session.isAdmin = user.isAdmin,
                            req.session.isVerified = 'true',
                            req.session.isBan = user.isBan,
                            req.session.status = user.status,
                            req.session.avatar = user.avatarImg

                        res.redirect('/')
                    }
                })

            } else {

                console.log("email is not verified")
                res.end("<h1>Bad Request</h1>")

            }

        } else {

            res.end("<h1> source inconuue</h1>")


        }

    }



}