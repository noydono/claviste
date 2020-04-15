const ArticleVerif = require('../../../db/ArticleVerif'),
    Article = require('../../../db/Article'),
    User = require('../../../db/User')


module.exports = {

    list: async (req, res) => {

        const dbArticle = await Article.find({})

        res.render('admin/article/listArticle', {
            dbArticle : dbArticle,
            ArticleU:req.flash('ArticleU')
        })

    },
    view: (req, res) => {

        res.render('admin/article/viewArticle')

    },
    edit: (req, res) => {

        res.render('admin/article/editArticle')

    }

}