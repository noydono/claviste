// req.flash ne marche pas fair la gestion d'err plus tard


const User = require('../../db/User'),
    Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
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
    get: async (req, res) => {
        console.log('bienvenue dans monCompte');
        const dbUser = await User.findById(req.session.userId),
            dbAllUser = await User.find({}),
            dbArticle = await Article.find({}),
            ArticleReverse = dbArticle.reverse()

        res.render('monCompte', {
            dbArticle: ArticleReverse,
            dbUser,
            dbAllUser
        })
    },
    update: async (req, res) => {

        console.log('update Mon Compte');

        const dbUser = await User.findById(req.session.userId),
            pathImg = path.resolve('public/uploads/' + dbUser.avatarName)

        if (req.body.username === "" && req.body.email === "") {

            console.log('pas update');
            res.redirect('back')


        } else if (req.body.email === "") {

            User.findByIdAndUpdate(req.session.userId, {

                username: req.body.username,

            }, (err, post) => {

                if (err) {

                    console.log('username err' + err);

                } else {

                    console.log('username update');
                    res.redirect('back')

                }
            })

        } else if (req.body.username === "") {

            User.findByIdAndUpdate(req.session.userId, {

                email: req.body.email

            }, (err, post) => {

                if (err) {
                    console.log('email update err ' + err);

                } else {
                    console.log('email update');

                    res.redirect('back')
                }
            })

        }



        // if (req.body.moncompte === "moncompte") {

        //     if (req.body.password !== req.body.passwordVerif) {

        //         console.log('error password')

        //         req.flash('registerPwdErr', 'vaut deux mpd ne sont pas les mếme')
        //         res.render('index')

        //     } else {

        //         console.log('password OK')
        //         if (!req.file) {

        //             User.findByIdAndUpdate(req.session.userId, {

        //                 username: req.body.username,
        //                 email: req.body.email,
        //                 passwordVerif: req.body.passwordVerif

        //             }, (err, post) => {

        //                 if (err) {
        //                     console.log('update user err nofile ' + err);

        //                 } else {
        //                     console.log('update reussi nofile');

        //                     res.redirect('back')
        //                 }
        //             })

        //         } else {

        //             fs.unlink(pathImg,
        //                 (err) => {
        //                     if (err) {

        //                         console.log(err)

        //                     } else {

        //                         console.log('File Deleted.')

        //                         User.findByIdAndUpdate(req.session.userId, {

        //                             username: req.body.username,
        //                             email: req.body.email,
        //                             passwordVerif: req.body.passwordVerif,
        //                             img: `/public/uploads/${req.file.filename}`,
        //                             nameImg: req.file.filename


        //                         }, (err, post) => {

        //                             if (err) {
        //                                 console.log('update file not post ' + err);

        //                             } else {
        //                                 console.log('update file post');

        //                                 res.redirect('back')
        //                             }
        //                         })
        //                     }

        //                 })
        //         }
        //     }
        // } else if (req.body.verifMail = 'verifMail') {

        // console.log(req.get('host'));

        //     rand = Math.floor((Math.random() * 100) + 54)
        //     host = req.get('host')
        //     link = "http://" + req.get('host') + "/verify/" + rand
        //     mailOptions = {
        //         from: 'noytest.test@gmail.com',
        //         to: dbUser.email,
        //         subject: "The Clavist Email de Verification",
        //         rand: rand,
        //         html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
        //     }

        //     console.log(mailOptions)

        //     transporter.sendMail(mailOptions, (err, res, next) => {


        //         if (err) {
        //             console.log(err)
        //             res.redirect('back')
        //         } else {
        //             console.log("Message Envoyer")
        //             next()
        //         }
        //     })

        //     res.redirect('/')
        // }


    }

}