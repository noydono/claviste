// req.flash ne marche pas fair la gestion d'err plus tard


const User = require('../../db/User'),
    Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    bcrypt = require('bcrypt'),
    path = require('path'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    keys = require('../../../config/keys')




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
        console.log(req.body.email)


        const userId = req.session.userId,
            dbUser = await User.findById(req.session.userId),
            pathImg = path.resolve('public/uploads/' + dbUser.avatarName)



        if (!req.file) {

            if (!req.body.username && !req.body.email && !req.file) {

                console.log('pas update');
                res.redirect('/')

            } else if (req.body.email) {

                User.findByIdAndUpdate(userId, {

                    email: req.body.email,

                }, (err, post) => {

                    if (err) {

                        console.log('email err' + err);
                        req.flash('emailUErr', '.')

                    } else {
                        req.flash('emailU', '.')
                        console.log('email update');
                        req.session.email = dbUser.email
                        res.redirect('/')

                    }
                })

            } else if (req.body.username) {

                User.findByIdAndUpdate(userId, {

                    username: req.body.username

                }, (err, post) => {

                    if (err) {

                        req.flash('usernameErr', '.')
                        console.log('username update err ' + err);

                    } else {

                        console.log('username update');
                        req.flash('usernameU', '.')
                        req.session.username = dbUser.username
                        res.redirect('/')

                    }
                })

            } else if (req.body.username && req.body.email) {

                User.findByIdAndUpdate(userId, {

                    username: req.body.username,
                    email: req.body.email

                }, (err, post) => {

                    if (err) {
                        console.log('usernameEMail update err ' + err);
                        req.flash('usernameEmailErr', '.')
                        res.redirect('/')
                    } else {

                        console.log('usernameEMail update');
                        req.flash('usernameEmailU', '.')
                        req.session.username = dbUser.username
                        req.session.email = dbUser.email
                        res.redirect('/')

                    }
                })
            }

        } else {

            if (!req.session.avatarImg) {

                if (!req.body.username && !req.body.email && req.file) {

                    User.findByIdAndUpdate(userId, {

                        avatarImg: `/public/uploads/${req.file.filename}`,
                        avatarName: req.file.filename

                    }, (err, post) => {

                        if (err) {

                            console.log('file not post ' + err);
                            req.flash('fileErr', 'err : votre photo na pas etez mis a jour')
                            res.redirect('/')

                        } else {

                            console.log('update file post');
                            req.flash('fileU', 'votre photo a etez mise a jour')
                            res.redirect('/')

                        }
                    })

                } else if (req.body.email && req.file) {

                    console.log('un email et un file');

                    console.log('File Deleted.')

                    User.findByIdAndUpdate(userId, {

                        email: req.body.email,
                        avatarImg: `/public/uploads/${req.file.filename}`,
                        avatarName: req.file.filename

                    }, (err, post) => {

                        if (err) {
                            console.log(' fileEmail not post ' + err);
                            req.flash('fileEmailErr', '.')
                            res.redirect('/')
                        } else {
                            console.log(' file post');
                            req.flash('fileEmailU', '.')
                            req.session.email = dbUser.email
                            res.redirect('/')
                        }
                    })

                } else if (req.body.username && req.file) {

                    console.log('un username et un file');


                    console.log('File Deleted.')

                    User.findByIdAndUpdate(userId, {

                        username: req.body.username,
                        avatarImg: `/public/uploads/${req.file.filename}`,
                        avatarName: req.file.filename

                    }, (err, post) => {

                        if (err) {

                            console.log(' fileusername not post ' + err);
                            req.flash('fileUsernameErr', '.')
                            res.redirect('/')

                        } else {

                            console.log(' fileusername post');
                            req.flash('fileUsernameU', '.')
                            req.session.username = dbUser.username
                            res.redirect('/')

                        }
                    })



                } else if (req.body.username && req.body.email && req.file) {

                    console.log('un username et un file');

                    console.log('File Deleted.')

                    User.findByIdAndUpdate(userId, {

                        username: req.body.username,
                        email: req.body.email,
                        avatarImg: `/public/uploads/${req.file.filename}`,
                        avatarName: req.file.filename

                    }, (err, post) => {

                        if (err) {

                            console.log(' fileusernameEmail not post ' + err);
                            req.flash('fileUsernameEmailErr', '.')
                            res.redirect('/')

                        } else {

                            console.log(' fileusernameEmail post');
                            req.flash('fileUsernameEmailU', '.')
                            req.session.username = dbUser.username
                            res.redirect('/')

                        }
                    })
                }

            } else {

                if (!req.body.username && !req.body.email && req.file) {

                    console.log('pas de username pas de email mais un file');


                    fs.unlink(pathImg,
                        (err) => {
                            if (err) {

                                console.log(err)

                            } else {

                                console.log('File Deleted.')

                                User.findByIdAndUpdate(userId, {

                                    avatarImg: `/public/uploads/${req.file.filename}`,
                                    avatarName: req.file.filename

                                }, (err, post) => {

                                    if (err) {

                                        console.log('file not post ' + err);
                                        req.flash('fileErr', 'err : votre photo na pas etez mis a jour')
                                        res.redirect('/')

                                    } else {

                                        console.log('update file post');
                                        req.flash('fileU', 'votre photo a etez mise a jour')
                                        res.redirect('/')

                                    }
                                })
                            }

                        })


                } else if (req.body.email && req.file) {

                    console.log('un email et un file');


                    fs.unlink(pathImg,
                        (err) => {
                            if (err) {

                                console.log(err)

                            } else {

                                console.log('File Deleted.')

                                User.findByIdAndUpdate(userId, {

                                    email: req.body.email,
                                    avatarImg: `/public/uploads/${req.file.filename}`,
                                    avatarName: req.file.filename

                                }, (err, post) => {

                                    if (err) {
                                        console.log(' fileEmail not post ' + err);
                                        req.flash('fileEmailErr', '.')
                                        res.redirect('/')
                                    } else {
                                        console.log(' file post');
                                        req.flash('fileEmailU', '.')
                                        req.session.email = dbUser.email
                                        res.redirect('/')
                                    }
                                })
                            }

                        })

                } else if (req.body.username && req.file) {

                    console.log('un username et un file');

                    fs.unlink(pathImg,

                        (err) => {
                            if (err) {

                                console.log(err)

                            } else {

                                console.log('File Deleted.')

                                User.findByIdAndUpdate(userId, {

                                    username: req.body.username,
                                    avatarImg: `/public/uploads/${req.file.filename}`,
                                    avatarName: req.file.filename

                                }, (err, post) => {

                                    if (err) {

                                        console.log(' fileusername not post ' + err);
                                        req.flash('fileUsernameErr', '.')
                                        res.redirect('/')

                                    } else {

                                        console.log(' fileusername post');
                                        req.flash('fileUsernameU', '.')
                                        req.session.username = dbUser.username
                                        res.redirect('/')

                                    }
                                })
                            }

                        })

                } else if (req.body.username && req.body.email && req.file) {

                    console.log('un username et un file');

                    fs.unlink(pathImg,

                        (err) => {
                            if (err) {

                                console.log(err)

                            } else {

                                console.log('File Deleted.')

                                User.findByIdAndUpdate(userId, {

                                    username: req.body.username,
                                    email: req.body.email,
                                    avatarImg: `/public/uploads/${req.file.filename}`,
                                    avatarName: req.file.filename

                                }, (err, post) => {

                                    if (err) {

                                        console.log(' fileusernameEmail not post ' + err);
                                        req.flash('fileUsernameEmailErr', '.')
                                        res.redirect('/')

                                    } else {

                                        console.log(' fileusernameEmail post');
                                        req.flash('fileUsernameEmailU', '.')
                                        req.session.username = dbUser.username
                                        res.redirect('/')

                                    }
                                })
                            }

                        })

                }

            }

        }

    }

}