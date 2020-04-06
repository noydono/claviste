const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User')
  

module.exports = {

    list: (req, res) => {

        res.render('admin/article/listArticle')

    },
    view: (req, res) => {

        res.render('admin/article/viewArticle')

    },
    edit: (req, res) => {

        res.render('admin/article/editArticle')

    }

}