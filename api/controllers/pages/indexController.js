const Article = require('../../db/Article'),
    User = require('../../db/User'),
    Handlebars = require('handlebars')


module.exports = {

    get: async (req, res) => {


        const dbUser = await User.findById(req.session.userId),
            dbAllUser = await User.find({}),
            dbArticle = await Article.find({})
            // dbArticleVerif = await Article.find({articleVerified : Number })

        let totalUser = dbAllUser.length;

        console.log(dbArticle.articleVerified);


        // console.log(dbArticle);

        res.render('index', {

            dbArticle,
            dbUser,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')

        })
    }


}