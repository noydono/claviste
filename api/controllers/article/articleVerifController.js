const Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User'),
    path = require('path'),
    fs = require('fs')


module.exports = {


    get: async (req, res) => {

        const dbUser = await User.findById(req.session.userId),
            dbArticle = await Article.find({}),
            ArticleReverse = dbArticle.reverse().slice(0, 8)

        res.render('article/listArticle', {
            dbArticle: ArticleReverse,
            dbUser
        })

    },
    getSingle: async (req, res) => {

        const dbUser = await User.findById(req.session.userId),
            dbArticle = await Article.findById(req.params.id)



        res.render('article/single/articleSingle', {
            dbArticle,
            dbUser,
            verifErr: req.flash('verifErr'),
            addVerif: req.flash('addVerif')
        })
    },
    addVerif: async (req, res) => {

        console.log('dans l\'ajoute de verif');

        const dbArticle = await Article.findById(req.params.id),
            dbUserVerif = await User.find({}),
            dbUser = await User.findById(req.session.userId),
            recup = {
                article_id: req.params.id
            }
                                //17               
        let pourcentage = dbArticle.articleVerified / dbUserVerif.length * 100,
            limitVerif = dbUserVerif.length * 20 / 100,
            verifUser = dbUser.verif,
            arrVerif = verifUser.filter((a) => {

                return a.article_id === req.params.id

            })

            console.log(dbUser.length);
            

        if (arrVerif.length === 0) {
            Article.findByIdAndUpdate(req.params.id, {

                articleVerified: dbArticle.articleVerified + 1

            }, (err, post) => {

                if (err) {

                    console.log(err);

                } else {

                    User.findOneAndUpdate({

                            _id: req.session.userId

                        }, {

                            $push: {
                                verif: recup
                            }

                        }, (error, success) => {

                            if (error) {

                                console.log(error);

                            } else {

                                console.log(success);
                            
                                if (pourcentage > limitVerif) {

                                    ArticleVerif.create({

                                        title: dbArticle.title,
                                        content: dbArticle.content,
                                        author: dbArticle.author,
                                        cover: dbArticle.callery[0].img,
                                        nameCover: dbArticle.callery[0].nameImg,
                                        callery: dbArticle.callery,
                                        createDate: new Date(),
                                        commentaire: [],
                                        like: []

                                    }, (err, post) => {

                                        if (err) {

                                            console.log(err);
                                            res.redirect('/')

                                        } else {

                                            Article.findByIdAndRemove(req.params.id, (err) => {

                                                if (err) {
                                                    console.log(err);
                                                    res.redirect('/')
                                                } else {
                                                    console.log('larticle et supprimer et verifer');
                                                    req.flash('addVerifPost', '.')
                                                    res.redirect('/')
                                                }
                                            })
                                        }

                                    })

                                } else {

                                    console.log('article na pas assez de verif');
                                    req.flash('addVerif', '.')
                                    res.redirect('back')

                                }

                            }
                        });


                }
            })

        } else {
            console.log('vous avez dejaverifier cette article');
            req.flash('verifErr', '.');
            res.redirect('back');
        }
    }
}