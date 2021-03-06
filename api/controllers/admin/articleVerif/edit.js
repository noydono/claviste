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
       
       

        
        

            ArticleVerif.findByIdAndUpdate(id, {

                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                activiteDate: format.asString('dd-MM-yyyy', new Date()),
               
               

            }, (err, post) => {

                if (err) {
                    console.log(err)

                }else{

                    req.flash('ArticleVerifU', '.')
                    res.redirect('/admin/list/articleVerif')

                }

            })



        

       



    }

}