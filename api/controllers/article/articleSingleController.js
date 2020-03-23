const Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User')


module.exports = {
    get: async (req, res) => {

        const dbUser = await User.findById(req.session.userId)
            dbAllUser = await User.find({}),
            dbArticle = await Article.find({}),
            dbArticleVerifSingle = await ArticleVerif.findById(req.params.id),
            ArticleReverse = dbArticle.reverse()

        res.render('articleVerifSingle', {

            dbArticleSingle : dbArticleVerifSingle,
            dbArticle: ArticleReverse,
            dbUser,
            dbAllUser,
            addLike:req.flash('addLike'),
            likeErr:req.flash('likeErr'),
            addCom:req.flash('addCom')

        })
    }
}