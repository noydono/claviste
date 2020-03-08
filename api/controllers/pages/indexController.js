const Article = require('../../db/Article'),
    User = require('../../db/User'),
    Handlebars = require('handlebars')


module.exports = {

    get: async (req, res) => {


        const dbUser = await User.findById(req.session.userId),
            dbAllUser = await User.find({}),
            dbArticle = await Article.find({})
            ArticleReverse = dbArticle.reverse()
console.log(req.session);


        res.render('index', {

            dbArticle : ArticleReverse,
            dbUser,
            dbAllUser,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')

        })
    }


}