const Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User')


module.exports = {
    get: async (req, res) => {

        const dbUser = await User.findById(req.session.userId)
             dbAllUser = await User.find({}),
            dbArticle = await Article.find({}),
            dbArticleSingle = await ArticleVerif.findById(req.params.id),
            ArticleReverse = dbArticle.reverse()

        res.render('articleSingle', {

            dbArticleSingle : dbArticleSingle,
            dbArticle: ArticleReverse,
            dbUser,
            dbAllUser

        })

    }
}