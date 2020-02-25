const Article = require('../../db/Article')
path = require('path'),
    fs = require('fs')


module.exports = {

    create: (req, res) => {

        console.log("creation d'article");


        Article.create({

            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            img: `/public/uploads/${req.file.filename}`,
            nameImg: req.file.filename,
            createDate: new Date()

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

        const dbArticle = await Article.findById(req.params.id)

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

                    res.redirect('/')
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

                                res.redirect('/')
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
    deleteAll: async (req, res) => {

        const coucou = await Article.deleteMany({});
        // `0` if no docs matched the filter, number of docs deleted otherwise
       

        const directory = 'public/uploads/';

        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        }); 
        console.log(coucou.deletedCount);
        res.redirect('/')


    }
}