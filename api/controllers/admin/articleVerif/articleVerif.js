const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User')
  

module.exports = {

    list: async (req, res) => {

        const dbArticleVerif = await ArticleVerif.find({})

        res.render('admin/articleVerif/listArticleVerif',{
            dbArticleVerif :dbArticleVerif

        })

    },
    view: (req, res) => {

        res.render('admin/articleVerif/viewArticleVerif')

    },
    edit: (req, res) => {

        res.render('admin/articleVerif/editArticleVerif')

    }

}