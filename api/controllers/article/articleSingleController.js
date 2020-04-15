const Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    Com = require ('../../db/commentaire'),
    User = require('../../db/User')


module.exports = {
    get: async (req, res) => {

        const dbUser = await User.findById(req.session.userId)
            dbAllUser = await User.find({}),
            dbArticle = await Article.find({}),
            dbArticleVerifSingle = await ArticleVerif.findById(req.params.id),
            ArticleReverse = dbArticle.reverse(),
            dbCom = await Com.find({ article_id: req.params.id }),
             Coms = dbCom.reverse()            

        res.render('articleVerif/single/articleVerifSingle', {

            dbArticleSingle : dbArticleVerifSingle,
            dbArticle: ArticleReverse,
            dbUser,
            dbAllUser,
            dbCom : Coms,
            Comlength:dbCom.length,
            addLike:req.flash('addLike'),
            likeErr:req.flash('likeErr'),
            addCom:req.flash('addCom')

        })
    }
}