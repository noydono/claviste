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

    postMpdOublier: async (req, res) => {

        console.log('coucou mpdoublier');
        console.log(req.get('host'));

        rand = Math.floor((Math.random() * 100) + 54)
        host = req.get('host')
        link = "http://" + req.get('host') + "/mdpOublier/" + rand
        mailOptions = {
            from: 'noytest.test@gmail.com',
            to: req.body.email,
            subject: "Mot de passe Oublier",
            rand: rand,
            html: "bonjour,<br> pour reinisialiser votre mot de passe merci de cliquer sur le lien.<br><a href=" + link + ">cliquer pour changer votre mot de passe</a>"
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

        req.flash('mdpOublierC', '.')
        res.redirect('/')


    },
    verifMail: async (req, res) => {

        const userID = await User.findOne({
                email: mailOptions.to
            }),
            query = {
                _id: userID._id
            }

        if ((req.protocol + "://" + "theclaviste.noydono.fr") == ("http://" +'theclaviste.noydono.fr')) {


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
                            req.session.role = user.role,
                            req.session.avatarImg = user.avatarImg
                        req.flash('verifOk', '.')
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

    },
    getMpdOublier: async (req, res) => {

        console.log('coucou mpd oublier');


        const userId = await User.findOne({
                email: mailOptions.to
            }),
            query = userId._id

        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {


            console.log("Domain is matched. Information is from Authentic email")

            if (req.params.id == mailOptions.rand) {

                console.log("dans le get du mdp oublier")
                res.redirect(`/updateMdp/${query}`)

            } else {

                console.log("email is not verified")
                res.redirect("/")

            }

        } else {
            res.end("<h1> source inconuue</h1>")
        }

    },
    getputmdpOublier: (req, res) => {
    
        res.render('/user/mdpOublier')

    },
    putMdpOublier: async (req, res) => {

        const dbUser = await User.findById(req.params.id)
        console.log('put mdp');
        console.log(dbUser);

        if(req.body.password === req.body.passwordVerif){

             bcrypt.hash(req.body.passwordVerif, 10, function(err, hash) {

                User.findByIdAndUpdate(req.params.id,{
                    passwordVerif : hash
                },(err,post) => {
                    if(err){

                        res.redirect('/')

                    }else{

                        req.flash('mdpOublierU')
                        res.redirect('/')
                    }
                })
        });
        }  
    }

}
