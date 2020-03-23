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

        res.render('listArticle', {
            dbArticle: ArticleReverse,
            dbUser
        })

    },
    getSingle: async (req, res) => {

        const dbUser = await User.findById(req.session.userId),
            dbArticle = await Article.findById(req.params.id)



        res.render('articleSingle', {
            dbArticle,
            dbUser,
            addVerif:req.flash('addVerif')
        })
    },
    addVerif: async (req, res) => {

        console.log('dans l\'ajoute de verif');

        const dbArticle = await Article.findById(req.params.id),
            dbUser = await User.find({})


        let pourcentage = dbArticle.articleVerified / dbUser.length * 100,
            limitVerif = dbUser.length * 20 / 100


        Article.findByIdAndUpdate(req.params.id, {
            articleVerified: dbArticle.articleVerified + 1
        }, (err, post) => {

            if (err) {

                console.log(err);

            } else {

                if (pourcentage > limitVerif) {

                    ArticleVerif.create({

                        title: dbArticle.title,
                        content: dbArticle.content,
                        author: dbArticle.author,
                        img: dbArticle.img,
                        nameImg: dbArticle.nameImg,
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
                                    req.flash('addVerifPost','.')
                                    res.redirect('/')
                                }
                            })
                        }

                    })

                } else {

                    console.log('article na pas assez de verif');
                    req.flash('addVerif','.')
                    res.redirect('back')

                }
            }
        })

        // else if (req.body.signal === 'signal') {

        //     Article.findByIdAndUpdate(
        //         req.params.id, {
        //             $push: {

        //                 signal: {
        //                     userId: req.session.userId
        //                 }

        //             }
        //         },
        //         function (error, success) {

        //             if (error) {

        //                 console.log(error);

        //             } else {

        //                 console.log(success);
        //                 res.redirect('/')

        //             }
        //         });
        // }
    }
}