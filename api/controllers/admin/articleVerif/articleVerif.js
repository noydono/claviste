const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User')
  

module.exports = {

    list: (req, res) => {

        res.render('admin/articleVerif/listArticleVerif')

    },
    view: (req, res) => {

        res.render('admin/articleVerif/viewArticleVerif')

    },
    edit: (req, res) => {

        res.render('admin/articleVerif/editArticleVerif')

    }

}