const Article = require('../../db/Article'),
    User = require('../../db/User'),
    Com = require('../../db/Commentaire'),
    Handlebars = require('handlebars')


module.exports = {

    get: async (req, res) => {


        const dbUser = await User.findById(req.session.userId)
        const dbArticle = await Article.find({}),
            dbArticleverif = await Article.find({ articleVerified: 2 }),
            dbCom = await Com.find({}),
            arrCom = [],
            arrArticle = []


        for (i = 0; i < dbCom.length; i++) { arrCom.push(dbCom[i]._id) }
        for (i = 0; i < dbArticle.length; i++) { arrArticle.push(dbArticle[i]._id) }
        for (i = 0; i < arrArticle.length; i++){

        }
        if
            console.log(arrCom);
        console.log(arrArticle);



        res.render('index', {

            dbArticle,
            dbUser,
            passwordNotSame: req.flash('passwordNotSame'),
            registerPwdErr: req.flash('registerPwdErr'),
            emailNotUnique: req.flash('emailNotUnique')

        })
    }


}