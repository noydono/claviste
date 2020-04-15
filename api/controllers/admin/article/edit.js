const Article = require('../../../db/Article'),
        User = require('../../../db/User'),
        format = require('date-format')
  

module.exports = {

   
    
    editId: async (req, res) => {
        const dbArticle = await Article.findById(req.params.id)

        console.log('editId');
        res.render('admin/article/editArticle',{
            dbArticle: dbArticle
        })

    },
    post: async (req, res) => {

        const id = req.params.id


        Article.findByIdAndUpdate(id,{

            title: req.body.title,
            content:req.body.content,
            author: req.body.author,
            activiteDate: format.asString('dd-MM-yyyy', new Date())

        },(err,post) => {

            if (err){

            }else{

            req.flash('ArticleU', '.')
            res.redirect('/admin/list/article')

            }

        }) 
    
    }

}