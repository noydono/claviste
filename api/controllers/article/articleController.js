const Article = require('../../db/Article'),
    Com = require('../../db/commentaire'),
    ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User'),
    path = require('path'),
    fs = require('fs')


module.exports = {


    create: (req, res) => {
        console.log(req.files);
        console.log("creation d'article");
        let arrFiles = []

       

        if(req.files.length != 0 && req.body.title && req.body.content){
            for (i = 0; i < req.files.length; i++) {

                arrFiles.push({
    
                    img: '/' + req.files[i].path,
                    nameImg: req.files[i].filename
    
                })
    
            }

            Article.create({

                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                cover: arrFiles[0].img,
                nameCover: arrFiles[0].nameImg,
                callery: arrFiles,
                createDate: new Date(),
                signal: []
    
            }, (err, post) => {
    
                if (err) {
                    console.log('article nest pas post ' + err);
                    req.flash('ArticleErr', '.')
                    res.redirect('/')
    
                } else {
                    console.log('article crée');
                    req.flash('ArticleC', '.')
                    res.redirect('/')
                }
    
            })
            
        }else {

            console.log('article err ');
            req.flash('ArticleErrNoContent', '.')
            res.redirect('/')
        }
        
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

    }
}