// req.flash ne marche pas fair la gestion d'err plus tard


const User = require('../../db/User'),
    bcrypt = require('bcrypt'),
    path = require('path'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    keys = require('../../../config/keys'),

    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        port: '587',
        secure: false,
        auth: {
            user: "noytest.test@gmail.com",
            pass: keys.mdpMailer
        },
        tls: {
            rejectUnauthorized: false
        }
    })

module.exports = {
    getlogin: (req, res) => {
        console.log('coucou')
        res.render('login', {
            passLog: req.flash('passLog'),
            notUser: req.flash('notUser'),
            
        })
    },
    getInscription: (req, res) => {
        console.log('coucou')
        res.render('inscription', {
            usernameNotUnique: req.flash('usernameNotUnique'),
            emailNotUnique: req.flash('emailNotUnique'),
            registerPwdErr: req.flash('registerPwdErr'),
        })
    },
    create: async (req, res) => {

        console.log('create user');


        const mail = await User.findOne({
            email: req.body.email
        })

        const userName = await User.findOne({
            username: req.body.username
        })

        if (!mail) {

            if(!userName){

                if (req.file) {

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

                            console.log(req.get('host'));

                            rand = Math.floor((Math.random() * 100) + 54)
                            host = req.get('host')
                            link = "http://" + req.get('host') + "/verify/" + rand
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
                                    res.redirect('back')
                                } else {
                                    console.log("Message Envoyer")
                                    req.flash('inscription', '.')
                                    res.redirect('/')
                                }
                            })




                        }
                    })
                }

            } else {
                if (req.body.password !== req.body.passwordVerif) {

                    console.log('error password')
                    req.flash('registerPwdErr', 'vaut deux mpd ne sont pas les mếme')
                    res.redirect('back')

                } else {
                    console.log('password OK')

                    User.create({

                        username: req.body.username,
                        email: req.body.email,
                        passwordVerif: req.body.passwordVerif

                    }, (err, user) => {

                        if (err) {

                            console.log(err);
                            res.redirect('back')

                        } else {
                            console.log(req.get('host'));

                            rand = Math.floor((Math.random() * 100) + 54)
                            host = req.get('host')
                            link = "http://" + req.get('host') + "/verify/" + rand
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
                                    res.redirect('back')

                                } else {

                                    console.log("Message Envoyer")
                                    next()


                                }

                            })

                            req.flash('inscription', '.')
                            res.redirect('/')
                        }
                    })
                }
            }

            }else{

                console.log('username not unique');
                req.flash('usernameNotUnique','le pseaudo et deja utiliser')
                res.redirect('back')
            }

        }else{
            console.log('email et deja utiliser');
            req.flash('emailNotUnique', 'email est deja utiliser')
            res.redirect('back')
            
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
                            req.session.avatarImg = user.avatarImg

                        req.flash('login', '.')
                        res.redirect('/')

                    } else {

                        console.log('mauvais mot de passe ');
                        req.flash('passLog', 'mot de pass incorrect')
                        res.redirect('back')

                    }

                });

            } else {

                console.log('pas existant dans la db');
                req.flash('notUser', 'cette utilisateur n\'existe pas ')
                res.redirect('back')

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


}