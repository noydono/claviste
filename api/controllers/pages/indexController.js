const Article = require('../../db/Article'),
    ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User'),
    Handlebars = require('handlebars')


    
module.exports = {

    get: async (req, res) => {


        const dbUser = await User.findById(req.session.userId),
            dbAllUser = await User.find({}),
            dbArticle = await Article.find({}),
            dbArticleVerif = await ArticleVerif.find({}),
            ArticleReverse = dbArticle.reverse(),
            ArticleVerifReverse = dbArticleVerif.reverse().slice(0,8)
            
            console.log(req.session);

        res.render('home', {

            dbArticle: ArticleReverse,
            dbArticleVerif: ArticleVerifReverse,
            dbUser,
            dbAllUser,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')

        })
    }


}