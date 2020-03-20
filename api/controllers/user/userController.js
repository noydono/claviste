// req.flash ne marche pas fair la gestion d'err plus tard


const User = require('../../db/User'),
    bcrypt = require('bcrypt'),
    path = require('path'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    keys = require('../../../config/keys')




var rand, mailOptions, host, link;

module.exports = {
    getlogin:(req,res) => {
        console.log('coucou')
        res.render('login',{
            layout: 'InCoAr',
            passLog: req.flash('passLog'),
            notUser: req.flash('notUser'),
            

        })
    },
    getInscription:(req,res) => {
        console.log('coucou')
        res.render('inscription',{
            layout: 'InCoAr',
            
        })
    },
    create: async (req, res) => {

        console.log('create user');

       
        const mail = await User.findOne({
            email: req.body.email
        })

        if (!mail) {
            if(req.file){

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
    
                        } res.redirect('/') 
                    })
                    }

            }else{
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
    
                        } res.redirect('back') 
                    })
                    }
            }
            


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

                            req.flash('welcome',"M.toast({html: 'bonjour'})")

                        res.redirect('/')

                    } else {

                        console.log('mauvais mot de passe ');
                        req.flash('passLog', 'mot de pass incorect')
                        res.redirect('back')

                    }

                });

            } else { 

                console.log('pas existant dans la db');
                req.flash('notUser', 'c\ette utilisateur n\'existe pas ')
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