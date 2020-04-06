const Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User')

module.exports = {


    get: async (req, res) => {



        const dbArticle = await Article.find({}),
        dbArticleVerif = await ArticleVerif.find({}),
        ArticleReverse = dbArticle.reverse(),
        ArticleVerifReverse = dbArticleVerif.reverse()
        dbUser = await User.find({}),
        adminUser = req.session.username
            




        res.render('admin/admin', {
            layout: 'admin',
            dbArticle: ArticleReverse,
            dbArticleVerif: ArticleVerifReverse,
            adminUser
        })
    }
}