const ArticleVerif = require('../../../db/ArticleVerif'),
    User = require('../../../db/User'),
    format = require('date-format'),
    path = require('path'),
    fs = require('fs')


module.exports = {



    editId: async (req, res) => {
        const dbArticleVerif = await ArticleVerif.findById(req.params.id)

        console.log('editId');
        res.render('admin/articleVerif/editArticleVerif', {
            dbArticleVerif: dbArticleVerif
        })

    },
    post: async (req, res) => {

        const id = req.params.id
        const dbArticleVerif = await ArticleVerif.findById(req.params.id)
        const dbcallery = dbArticleVerif.callery
        let arrFiles = []

        console.log(dbcallery);

        for (i = 0; i < req.files.length; i++) {

            arrFiles.push({

                img: '/' + req.files[i].path,
                nameImg: req.files[i].filename

            })

            console.log(arrFiles);

        }



        for (i = 0; i < dbcallery.length; i++) {

            fs.unlink(path.resolve('public/uploads/' + dbcallery[i].nameImg),

                (err) => {

                    if (err) {

                        console.log(err)

                    } else {

                        ArticleVerif.findByIdAndUpdate(id, {

                            title: req.body.title,
                            content: req.body.content,
                            author: req.body.author,
                            activiteDate: format.asString('dd-MM-yyyy', new Date()),
                            callery: arrFiles,
                            cover: arrFiles[0].img,
                            nameCover: arrFiles[0].nameImg

                        }, (err, post) => {

                            if (err) {

                            }

                        })

                    }

                })

        }

        req.flash('ArticleVerifU', '.')
        res.redirect('/admin/list/articleVerif')



    }

}