const Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User'),
    path = require('path'),
    fs = require('fs')


module.exports = {

    single:(req,res)=> {

        res.render('articleSingle')

    },
    create: (req, res) => {

        console.log("creation d'article");
        console.log(req.file);


        Article.create({

            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            img: `/public/uploads/${req.file.filename}`,
            nameImg: req.file.filename,
            createDate: new Date(),
            signal:[]


        }, (err, post) => {

            if (err) {
                console.log('article nest pas post ' + err);

            } else {
                console.log('article crée');

                res.redirect('/')
            }

        })
    },


    update: async (req, res) => {

        console.log('update article');

        const dbArticle = await Article.findById(req.params.id),
            pathImg = path.resolve('public/uploads/' + dbArticle.nameImg)


        if (!req.file) {

            Article.findByIdAndUpdate(req.params.id, {

                title: req.body.title,
                content: req.body.content,
                author: req.body.author,

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

                        Article.findByIdAndUpdate(req.params.id, {

                            title: req.body.title,
                            content: req.body.content,
                            img: `/public/uploads/${req.file.filename}`,
                            author: req.body.author,
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

    },
    delete: async (req, res) => {

        const dbArticle = await Article.findById(req.params.id)

        pathImg = path.resolve('public/uploads/' + dbArticle.nameImg)


        Article.findByIdAndRemove(req.params.id, (err) => {
            if (!err) {
                fs.unlink(pathImg,
                    (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('File Deleted.')
                            res.redirect('/')
                        }

                    })

            }
        })
    },
    // deleteAll: async (req, res) => {

    //     const coucou = await Article.deleteMany({});
    //     // `0` if no docs matched the filter, number of docs deleted otherwise


    //     const directory = 'public/uploads/';

    //     fs.readdir(directory, (err, files) => {
    //         if (err) throw err;

    //         for (const file of files) {
    //             fs.unlink(path.join(directory, file), err => {
    //                 if (err) throw err;
    //             });
    //         }
    //     }); 
    //     res.redirect('/')


    // },
    addVerif: async (req, res) => {

        const dbArticle = await Article.findById(req.params.id),
            dbUser = await User.find({}),
            articleAdd = dbArticle.articleVerified + 1;

        let pourcentage = articleAdd / dbUser.length * 100,
            limitVerif = dbUser.length * 20 / 100


        if (req.body.verif === 'verif') {

            Article.findByIdAndUpdate(req.params.id, {
                articleVerified: articleAdd
            }, (err, post) => {

                if (err) {

                    console.log(err);

                } else {

                    if (pourcentage >= limitVerif) {

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
                                res.redirect('back')

                            } else {

                                Article.findByIdAndRemove(req.params.id, (err) => {

                                    if (err) {
                                        console.log(err);
                                        res.redirect('back')
                                    } else {
                                        console.log('larticle et supprimer et verifer');

                                        res.redirect('back')
                                    }
                                })
                            }

                        })

                    } else {


                    }
                }
            })

        } else if (req.body.signal === 'signal') {

            

            Article.findByIdAndUpdate(
                req.params.id
            , {
                $push: {

                    signal: {userId:req.session.userId}

                }
            },
                function (error, success) {

                    if (error) {

                        console.log(error);

                    } else {

                        console.log(success);
                        res.redirect('/')

                    }
                });


        }



    }
}